import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Geolocation from '@react-native-community/geolocation';

import HomeScreen from '../HomeScreen';
import MessageScreen from '../MessageScreen';
import MapScreen from '../MapScreen';
import MeetingScreen from '../MeetingRoomScreen';
import ContactScreen from '../ContactScreen';

const Tab = createMaterialBottomTabNavigator();

export default class MainStack extends React.Component {

  constructor(props) {
    super(props)
    this.state = { chosenDate: new Date() }

    this.setDate = this.setDate.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  async componentDidMount() {
    // this._getLocation()
  }

  render() {
    return (
      // <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" 
            component={HomeScreen} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
          }}/>
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
        </Tab.Navigator>
      // </NavigationContainer>
    );
  }
}