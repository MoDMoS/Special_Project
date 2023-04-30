import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {Alert} from 'react-native';
import { LogBox } from 'react-native';
import PushNotification from 'react-native-push-notification';

import LoginStack from './Navigation/LoginStack';
import HomeStack from './Navigation/HomeStack';
import PincodeScreen from './Screen/PincodeScreen';

const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();

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
    createChannel();
  }, []);

  useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const { latitude, longitude, accuracy } = position.coords;
    //     console.log(position.coords);
    //     if (accuracy > 35) {
    //       setMockLocationEnabled(true);
    //       console.log('Mock location detected');
    //     } else {
    //       console.log('Real location');
    //     }
    //   },
    //   error => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
  }, []);

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Test Channel',
      }
    )
  }

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
            title: 'หน้าแรก',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'Home' }}
        />
        <Drawer.Screen
          name="Message"
          component={HomeStack}
          options={{
            title: 'ข่าวสาร',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MessageStack' }}
        />
        <Drawer.Screen
          name="Map"
          component={HomeStack}
          options={{
            title: 'ลงเวลางาน',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MapStack' }}
        />
        <Drawer.Screen
          name="Meeting"
          component={HomeStack}
          options={{
            title: 'จองห้องประชุม',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MeetingStack' }}
        />
        <Drawer.Screen
          name="Contact"
          component={HomeStack}
          options={{
            title: 'ข้อมูลติดต่อ',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'Contacts' }}
        />
        <Drawer.Screen
          name="Report"
          component={HomeStack}
          options={{
            title: 'เช็คประวัติการลงเวลางาน',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MapStack', initialRouteName2: 'Reports' }}
        />
        <Drawer.Screen
          name="BookingCheck"
          component={HomeStack}
          options={{
            title: 'เช็คสถานะการจองห้องประชุม',
            headerTitle: '',
            unmountOnBlur: true
          }}
          initialParams={{ initialRouteName: 'MeetingStack', initialRouteName2: 'Apporval' }}
        />
      </Drawer.Navigator>
    );
  } else {
    return 
  }
};

export default Root;
