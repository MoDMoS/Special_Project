import React, {useState, useRef, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Text, View, Alert} from 'react-native';
import {REACT_APP_KEY_API_MAP} from '@env';
import {useNavigation} from '@react-navigation/native';
import Longdo from 'longdo-map-react-native';

import Service from '../api';
import Geolocation from '@react-native-community/geolocation';

Longdo.apiKey = REACT_APP_KEY_API_MAP;

const AuthScreen = ({route}) => {
  const mapRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  // const isLocationInArea = () => {
  //   if (mapRef.current) {
  //     const map = mapRef.current.map;
  //     const center = new map.Longdo.LatLng(
  //       13.580809017392253,
  //       100.32492629337678,
  //     );
  //     const radius = 1000; // in meters
  //     const circle = new map.Longdo.Circle({radius: radius}, {strokeWeight: 0});
  //     circle.bindTo('position', center);
  //     map.Overlays.add(circle);

  //     const location = new map.Longdo.LatLng(13.5838344, 100.3392761); // sample location to check
  //     if (circle.contains(location)) {
  //       console.log('The location is within the area');
  //     } else {
  //       console.log('The location is outside the area');
  //     }
  //   }
  // };

  const takePicture = async faces => {
    const timeoutId = setTimeout(() => {
      console.log('5 seconds have passed');
    }, 50000);
    if (faces.faces[0]) {
      if (cameraRef.current && !imageUri) {
        clearTimeout(timeoutId);
        const options = {quality: 0.8, base64: true};
        const data = await cameraRef.current.takePictureAsync(options);
        const formData = new FormData();
        formData.append('image', {
          uri: data.uri,
          type: 'image/jpeg',
          name: `${route.params.data}.jpg`,
        });
        formData.append('EmpID', route.params.data);
        try {
          setImageUri(data.uri);
          if (imageUri != null) {
            // isLocationInArea()
            console.log('Successfully');
            navigation.navigate('Map');
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      clearTimeout(timeoutId);
      console.log('Not Face');
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
          onFacesDetected={faces => takePicture(faces)}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks.all
          }
        />
      </View>
    );
  } else {
    return null;
  }
};

export default AuthScreen;
