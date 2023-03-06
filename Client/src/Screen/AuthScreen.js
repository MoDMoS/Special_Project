import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import { captureScreen } from 'react-native-view-shot';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AuthScreen = () => {
  
  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const [box, setBox] = useState(null);
  const cameraRef = useRef(null);

  const handlerFace = ({faces}) => {
    if (faces[0]) {
      captureScreen({
        // Either png or jpg (or webm Android Only), Defaults: png
        format: 'jpg',
        // Quality 0.0 - 1.0 (only available for jpg)
        quality: 0.8, 
      }).then(
        //callback function to get the result URL of the screnshot
        (uri) => {
          console.log("Image saved to", uri)
        },
        (error) => console.error('Oops, Something Went Wrong', error),
      );
    } else {
      console.log("Not face")
    }


  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        captureAudio={false}
        onFacesDetected={handlerFace}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        flashMode= {RNCamera.Constants.FlashMode.on}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
      />
      {box && (
        <>
          <View
            style={styles.bound({
              width: box.boxs.width,
              height: box.boxs.height,
              x: box.boxs.x,
              y: box.boxs.y,
            })}
          />
        </>
      )}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  camera: {
    flexGrow: 1,
  },
  bound: ({width, height, x, y}) => {
    return {
      position: 'absolute',
      top: y,
      left: x - 50,
      height,
      width,
      borderWidth: 5,
      borderColor: 'red',
      zIndex: 3000,
    };
  },
  glasses: ({rightEyePosition, leftEyePosition, yawAngle, rollAngle}) => {
    return {
      position: 'absolute',
      top: rightEyePosition.y - 60,
      left: rightEyePosition.x - 100,
      resizeMode: 'contain',
      width: Math.abs(leftEyePosition.x - rightEyePosition.x) + 100,
    };
  },
});