import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginStack from './Navigation/LoginStack';
import HomeStack from './Navigation/HomeStack';
import MessageStack from './Navigation/MessageStack';
import MapStack from './Navigation/MapStack';
import MeetingScreen from './Screen/MeetingRoomScreen';
import ContactScreen from './Screen/ContactScreen';
import PincodeScreen from './Screen/PincodeScreen';

const Drawer = createDrawerNavigator();

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialScreen: null,
    };
    this.account = {
      pincode: null,
      empId: null,
    }
  }

  getData = async () => {
    try {
      const Pincode = await AsyncStorage.getItem('Pincode');
      const ID = await AsyncStorage.getItem('ID');
      if (Pincode !== null) {
        // console.log(Pincode);
        this.account.pincode = Pincode
        this.account.empId = ID
        this.setState({ initialScreen: 'LoginStack' });
      } else {
        this.setState({ initialScreen: 'LoginStack' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    this.getData();
    const {initialScreen} = this.state;
    if (initialScreen) {
      // console.log(this.account.pincode);
      return (
        <Drawer.Navigator initialRouteName={initialScreen}>
          <Drawer.Screen
            name="LoginStack"
            component={LoginStack}
            options={{
              headerShown: false,
              drawerItemStyle: {display: 'none'},
            }}
          />
          <Drawer.Screen
            name="Pincode"
            component={PincodeScreen}
            initialParams={this.account}
            options={{
              headerShown: false,
              drawerItemStyle: {display: 'none'},
            }}
          />
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: 'Home',
              headerTitle: '',
            }}
          />
          <Drawer.Screen
            name="MessageStack"
            component={MessageStack}
            options={{
              title: 'Message',
            }}
          />
          <Drawer.Screen
            name="MapStack"
            component={MapStack}
            options={{
              title: 'Check in',
            }}
          />
          <Drawer.Screen
            name="Meeting"
            component={MeetingScreen}
            options={{
              title: 'Meeting room',
            }}
          />
          <Drawer.Screen
            name="Contacts"
            component={ContactScreen}
            options={{
              title: 'Contacts',
            }}
          />
        </Drawer.Navigator>
      );
    }
  }
}

export default Root;
