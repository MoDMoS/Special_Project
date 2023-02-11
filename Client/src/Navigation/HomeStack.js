import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../Screen/HomeScreen';
import MessageScreen from '../Screen/MessageScreen';
import MapScreen from '../Screen/MapScreen';
import MeetingScreen from '../Screen/MeetingRoomScreen';
import ContactScreen from '../Screen/ContactScreen';
import MapStack from './MapStack';
import AuthScreen from '../Screen/AuthScreen';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Message" 
        component={MessageScreen} 
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-alert" color={color} size={26} />
          ),
      }}/>
      <Tab.Screen name="Map" 
        component={MapScreen} 
        options={{
          tabBarLabel: 'Check in',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-check" color={color} size={26} />
          ),
      }}/>
      <Tab.Screen name="Meeting" 
        component={MeetingScreen} 
        options={{
          tabBarLabel: 'Meeting room',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="meeting-room" color={color} size={26} />
          ),
      }}/>
      <Tab.Screen name="Contacts" 
        component={ContactScreen} 
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="contact-phone" color={color} size={26} />
          ),
      }}/>
      <Tab.Screen name="Auth" 
        component={AuthScreen} 
        options={{
          tabBarButton: (props) => null,
          // tabBarStyle: { display: 'none' },
      }}/>
    </Tab.Navigator>
  );
}