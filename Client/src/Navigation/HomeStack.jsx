import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Screen/HomeScreen';
import MeetingScreen from '../Screen/MeetingRoomScreen';
import ContactScreen from '../Screen/ContactScreen';
import MapStack from './MapStack';
import MessageStack from './MessageStack';
import DetailScreen from '../Screen/DetailScreen';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 85, // change the height to your desired value
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'หน้าแรก',
          tabBarLabelStyle: {
            fontSize: 14, 
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="MessageStack"
        component={MessageStack}
        options={{
          tabBarLabel: 'ข่าวสาร',
          tabBarLabelStyle: {
            fontSize: 14, 
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-alert"
              color={color}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MapStack"
        component={MapStack}
        options={{
          tabBarLabel: 'ลงเวลางาน',
          tabBarLabelStyle: {
            fontSize: 14, 
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-check"
              color={color}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Meeting"
        component={MeetingScreen}
        options={{
          tabBarLabel: 'จองห้องประชุม',
          tabBarLabelStyle: {
            fontSize: 12, 
          },
          tabBarIcon: ({color}) => (
            <MaterialIcons name="meeting-room" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarLabel: 'ติดต่อ',
          tabBarLabelStyle: {
            fontSize: 14, 
          },
          tabBarIcon: ({color}) => (
            <MaterialIcons name="contact-phone" color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
