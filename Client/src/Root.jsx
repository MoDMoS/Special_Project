import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginStack from './Navigation/LoginStack';
import HomeStack from './Navigation/HomeStack';
import MessageStack from './Navigation/MessageStack';
import MapStack from './Navigation/MapStack';
import MeetingScreen from './Screen/MeetingRoomScreen';
import ContactScreen from './Screen/ContactScreen';
import PincodeScreen from './Screen/PincodeScreen';
import Geolocation from '@react-native-community/geolocation';
import ReportsScreen from './Screen/ReportsScreen';

const Drawer = createDrawerNavigator();

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialScreen: null,
      mockLocationEnabled: false,
    };
    this.account = {
      pincode: null,
      empId: null,
    };
    this.checkForMockLocation();
  }

  getData = async () => {
    try {
      const Pincode = await AsyncStorage.getItem('Pincode');
      const ID = await AsyncStorage.getItem('ID');
      if (Pincode !== null) {
        // console.log(Pincode);
        this.account.pincode = Pincode;
        this.account.empId = ID;
        this.setState({initialScreen: 'LoginStack'});
      } else {
        this.setState({initialScreen: 'LoginStack'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  checkForMockLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude, accuracy} = position.coords;
        console.log(position.coords)
        if (accuracy > 50) {
          this.setState({mockLocationEnabled: true});
          console.log('Mock location detected');
        } else {
          console.log('Real location');
        }
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  render() {
    this.getData();
    const {initialScreen, mockLocationEnabled} = this.state;
    if (initialScreen && !mockLocationEnabled) {
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
          <Drawer.Screen
            name="Reports"
            component={ReportsScreen}
            options={{
              title: 'Reports',
            }}
          />
        </Drawer.Navigator>
      );
    } else {
      return
    }
  }
}

export default Root;
