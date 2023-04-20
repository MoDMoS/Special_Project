import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

import LoginStack from './Navigation/LoginStack';
import HomeStack from './Navigation/HomeStack';
import MessageStack from './Navigation/MessageStack';
import MapStack from './Navigation/MapStack';
import MeetingScreen from './Screen/MeetingRoomScreen';
import ContactScreen from './Screen/ContactScreen';
import PincodeScreen from './Screen/PincodeScreen';
import ReportsScreen from './Screen/ReportsScreen';

const Drawer = createDrawerNavigator();

const Root = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const [mockLocationEnabled, setMockLocationEnabled] = useState(false);
  const [pincode, setPincode] = useState(null);
  const [empId, setEmpId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const Pincode = await AsyncStorage.getItem('Pincode');
        const ID = await AsyncStorage.getItem('ID');
        if (Pincode !== null) {
          setPincode(Pincode);
          setEmpId(ID);
          setInitialScreen('Pincode');
        } else {
          setInitialScreen('LoginStack');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(position.coords);
        if (accuracy > 35) {
          setMockLocationEnabled(true);
          console.log('Mock location detected');
        } else {
          console.log('Real location');
        }
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  if (initialScreen && !mockLocationEnabled) {
    return (
      <Drawer.Navigator initialRouteName={initialScreen}>
        <Drawer.Screen
          name="LoginStack"
          component={LoginStack}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' },
            unmountOnBlur: true
          }}
        />
        <Drawer.Screen
          name="Pincode"
          component={PincodeScreen}
          initialParams={{ pincode, empId }}
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' },
            unmountOnBlur: true
          }}
        />
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: 'Home',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'Home' }} 
        />
        <Drawer.Screen
          name="Message"
          component={HomeStack}
          options={{
            title: 'Message',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MessageStack' }} 
        />
        <Drawer.Screen
          name="Map"
          component={HomeStack}
          options={{
            title: 'Check in',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MapStack' }} 
        />
        <Drawer.Screen
          name="Meeting"
          component={HomeStack}
          options={{
            title: 'Meeting room',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MapStack' }} 
        />
        <Drawer.Screen
          name="Contact"
          component={HomeStack}
          options={{
            title: 'Contacts',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'Contacts' }} 
        />
        <Drawer.Screen
          name="Report"
          component={HomeStack}
          options={{
            title: 'Reports',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MapStack', initialRouteName2: 'Reports' }} 
        />
      </Drawer.Navigator>
    );
  } else {
    return null;
  }
};

export default Root;
