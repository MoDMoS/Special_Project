import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import JailMonkey from 'jail-monkey';
import {Alert, Location} from 'react-native';
import MockLocationDetector from 'react-native-mock-location-detector';

import Root from './src/Root';

export default function App() {

  useEffect(() => {
    _handleJail();
  }, []);

  const _handleJail = () => {
    if (!__DEV__ && JailMonkey.isJailBroken()) {
      Alert.alert('Your device is jailbroken');
    }
  };

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
