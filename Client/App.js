import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import JailMonkey from 'jail-monkey';
import {Alert, Location} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Root from './src/Root';

export default function App() {

  useEffect(() => {
    _handleJail();
    isMockLocationEnabled().then(mockEnabled => {
      if (mockEnabled) {
        console.log('Mock locations are enabled');
      } else {
        console.log('Mock locations are not enabled');
      }
    });
  }, []);

  const isMockLocationEnabled = async () => {
    try {
      const provider = await Geolocation.getCurrentProvider();
      return provider.locationProvider === Geolocation.LOCATION_PROVIDER.MOCK_PROVIDER;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

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
