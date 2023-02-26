import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Root from './src/Root';
import LoginStack from './src/Navigation/LoginStack';
import RegisScreen from './src/Screen/RegisScreen';
import HomeStack from './src/Navigation/HomeStack';
import MessageScreen from './src/Screen/MessageScreen';
import MapScreen from './src/Screen/MapScreen';
import MeetingScreen from './src/Screen/MeetingRoomScreen';
import ContactScreen from './src/Screen/ContactScreen';

const Drawer = createDrawerNavigator();

export default class App extends Component {

  componentDidMount(){
    this._handleJail()
  }

  _handleJail() {
    if (!__DEV__ && JailMonkey.isJailBroken()) {
      store.dispatch(ControlActions.showCloseService('JAIL_ROOT'))
    }
  }

  render() {
    return  (
      <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen name="LoginStack" 
            component={LoginStack}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          /> 
          <Drawer.Screen name="Regis" 
            component={RegisScreen}
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          /> 
          <Drawer.Screen name="HomeStack" 
            component={HomeStack} 
            options={{
              title: 'Home',
              headerTitle: ''
            }}
          />
          <Drawer.Screen name="Message" 
            component={MessageScreen} 
            options={{
              title: 'Message',
            }}
          />
          <Drawer.Screen name="Map" 
            component={MapScreen} 
            options={{
              title: 'Check in',
            }}
          />
          <Drawer.Screen name="Meeting" 
            component={MeetingScreen} 
            options={{
              title: 'Meeting room',
            }}
          />
          <Drawer.Screen name="Contacts" 
            component={ContactScreen} 
            options={{
              title: 'Contacts',
            }}
          />
        </Drawer.Navigator>
    </NavigationContainer>
    )
  }
}
