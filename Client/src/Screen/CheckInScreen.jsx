import React, {useState, useRef, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Text, View, Alert, ActivityIndicator} from 'react-native';
import {REACT_APP_KEY_API_MAP} from '@env';
import {useNavigation} from '@react-navigation/native';
import Longdo from 'longdo-map-react-native';
import DeviceInfo from 'react-native-device-info';

import Service from '../api';
import {isLocationInsideCircle} from '../Service/Checkloaction';

Longdo.apiKey = REACT_APP_KEY_API_MAP;

const CheckInScreen = ({route}) => {
  const [imageUri, setImageUri] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const DeviceModel = DeviceInfo.getModel();
  const dateTime = new Date();

  // เช็คตำแหน่งที่ตั้ง
  const checkLocation = async faces => {
    if (!faceDetected) {
      const location = route.params.location;
      const isInsideCircle = isLocationInsideCircle( location, 23 );
      if (isInsideCircle) {
        takePicture(faces);
      } else {
        setFaceDetected(true);
        Alert.alert(
          'ลงชื่อเข้างาน',
          'ไม่สามารถลงเวลาได้เนื่องจากตำแหน่งไม่ถูกต้อง',
          [{text: 'OK', onPress: () => navigation.navigate('Map')}],
        );
      }
    }
  };

  // ตรวจสอบใบหน้า
  const takePicture = async faces => {
    const timeoutId = setTimeout(() => {
      console.log('5 seconds have passed');
    }, 100000);
    if (faces.faces[0]) {
      setFaceDetected(true);
      if (cameraRef.current && !imageUri) {
        clearTimeout(timeoutId);
        const options = {quality: 0.8, base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        setImageUri(data.uri);
        const formData = new FormData();
        formData.append('image', {
          uri: data.uri,
          type: 'image/jpeg',
          name: route.params.data + `.jpg`,
        });
        try {
          const year = dateTime.getFullYear();
          const month = String(dateTime.getMonth() + 1).padStart(2, '0');
          const day = String(dateTime.getDate()).padStart(2, '0');
          const date = `${year}-${month}-${day}`;
          // console.log(date);
          const time = dateTime.toLocaleTimeString('th-TH', {hour12: false});
          // console.log(route.params.location);
          const response = await Service.AuthAPI(formData);
          if (response.data.message == 'Face match!!') {
            Service.CheckIn(
              route.params.data,
              date,
              time,
              route.params.location.latitude + ', ' + route.params.location.longitude,
              DeviceModel,
            );
            Alert.alert('ลงชื่อเข้างาน', 'ลงชื่อเข้างานเรียบร้อย', [
              {text: 'OK', onPress: () => navigation.navigate('Map')},
            ]);
          } else {
            console.log(response.data.message);
            Alert.alert('ลงชื่อเข้างาน', 'ไม่สามารถลงชื่อเข้างานได้', [
              {text: 'OK', onPress: () => navigation.navigate('Map')},
            ]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  if (!imageUri) {
    return (
      <View style={{flex: 1}}>
        <RNCamera
          style={{flex: 1}}
          type={RNCamera.Constants.Type.front}
          ref={cameraRef}
          captureAudio={false}
          onFacesDetected={faces => checkLocation(faces)}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks.all
          }
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{marginTop: 10}}>Loading...</Text>
      </View>
    );
  }
};

export default CheckInScreen;
