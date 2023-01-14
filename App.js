import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/Navigation/MainStack';
// import NavDrawer from './src/Navigation/Drawer';

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
        {/* <NavDrawer /> */}
        <MainStack />
      </NavigationContainer>
    )
  }
}
