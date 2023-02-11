import React, { Component } from 'react';

import Root from './src/Root';

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
      <Root />
    )
  }
}
