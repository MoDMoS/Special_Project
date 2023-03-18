import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null
    };
  }

  async takePicture(faces) {
    const timeoutId = setTimeout(() => {
      console.log('5 seconds have passed');
    }, 50000);
    if (faces.faces[0]) {
      if (this.camera && !this.state.imageUri) {
        clearTimeout(timeoutId);
        const options = { quality: 0.8, base64: true };
        const data = await this.camera.takePictureAsync(options);
        this.setState({ imageUri: data.uri });
        CameraRoll.save(data.uri, { type: 'photo' })
        .then(() => {
            console.log('Image saved to camera roll');
            this.props.navigation.navigate('Map');
        })
        .catch((error) => console.error('Error saving image to camera roll: ', error));

      }
    }
    else {
      clearTimeout(timeoutId);
      console.log("Not Face")
    }
  }

  render() {
    const { imageUri } = this.state;
    if (!imageUri) {
      return (
        <View style={{ flex: 1 }}>
          <RNCamera
            style={{ flex: 1 }}
            type={RNCamera.Constants.Type.front}
            ref={ref => {
              this.camera = ref;
            }}
            captureAudio={false}
            onFacesDetected={(faces) => this.takePicture(faces)}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
            faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          />
        </View>
      );
    } else {
      return 
    }
  }
}

export default AuthScreen;
