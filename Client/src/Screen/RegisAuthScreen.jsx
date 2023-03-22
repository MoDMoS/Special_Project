import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from 'react-native'
import DeviceInfo from 'react-native-device-info';

import Service from '../api';

class RegisAuthScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
    };
    this.EmpID = JSON.parse(this.props.route.params.EmployeeID);
    this.Pin = JSON.parse(this.props.route.params.pin);
    this.DeviceModel = DeviceInfo.getModel();
    // console.log(this.props.route.params);
  }

  handlerFace = ({faces}) => {
    if (faces.length > 0) {
      const face = faces[0].bounds;
      this.setState({
        faceCoordinates: {
          x: face.origin.x,
          y: face.origin.y,
          width: face.size.width,
          height: face.size.height,
        },
      });
    } else {
      this.setState({faceCoordinates: null});
    }
  };

  takePicture = async () => {
    const options = {quality: 0.8, base64: false};
    const data = await this.camera.takePictureAsync(options);
    // console.log(data.uri);
    this.setState({imageUri: data.uri});
  }

  uploadPicture = async (data) => {
    const formData = new FormData();
    formData.append('picture', {
      uri: data.uri,
      type: 'image/jpeg',
      name: `${this.EmpID}.jpg`,
    });
    formData.append('EmpID', this.EmpID);
    formData.append('Pin', this.Pin);
    formData.append('Device', this.DeviceModel);
    const check = await Service.CheckAccountAPI(this.EmpID);
    console.log(check.data);
    formData.append('Check', check.data);

    try {
      const response = await Service.RegisAuthAPI(formData);
      // console.log(response.data);
      if(response.data == "File uploaded successfully"){
        this.props.navigation.navigate('HomeStack');
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderCamera() {
    const { faceCoordinates } = this.state;
    return (
      <View style={{flex: 1}}>
        <RNCamera
          style={{flex: 1}}
          type={RNCamera.Constants.Type.front}
          onFacesDetected={this.handlerFace}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks.all
          }
          faceDetectionClassifications={
            RNCamera.Constants.FaceDetection.Classifications.all
          }
          ref={ref => {
            this.camera = ref;
          }}
        />
        {faceCoordinates && (
          <View
            style={{
              position: 'absolute',
              top: faceCoordinates.y,
              left: faceCoordinates.x,
              width: faceCoordinates.width,
              height: faceCoordinates.height,
              borderColor: 'red',
              borderWidth: 2,
            }}
          />
        )}
        <TouchableOpacity
          style={{
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 50,
            padding: 15,
            marginBottom: 20,
          }}
          onPress={() => this.takePicture()}>
          <Text style={{fontSize: 20}}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderImage() {
    return (
      <ImageBackground
        source={{uri: this.state.imageUri}}
        style={{flex: 1}}
        resizeMode="contain">
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 20,
            bottom: 50,
            padding: 30,
            backgroundColor: 'red',
            borderRadius: 50,
          }}
          onPress={() => this.setState({imageUri: null})}>
          <Text style={{fontSize: 18, color: '#fff'}}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            bottom: 50,
            padding: 30,
            backgroundColor: 'green',
            borderRadius: 50,
          }}
          onPress={() => this.uploadPicture(this.state.imageUri)}>
          <Text style={{fontSize: 18, color: '#fff'}}>Confirm</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  render() {
    const {imageUri} = this.state;
    return imageUri ? this.renderImage() : this.renderCamera();
  }
}

export default RegisAuthScreen;
