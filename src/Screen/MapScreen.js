import React from 'react';
import { StyleSheet, Button, SafeAreaView } from 'react-native';
import Longdo from 'longdo-map-react-native';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';

Longdo.apiKey = 'f919d225cb7a5f8573f953a21d3dcd42';
let map;


export default class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() { 
    this._getLocation();
  }

  onReady = () => {
    console.log('ready ' + new Date());
    map.call('Overlays.load', Longdo.object('Overlays.Object', 'A00146852', 'LONGDO'));
    loc = { lon: this.state.longitude, lat: this.state.latitude };
    home = Longdo.object('Marker', loc, { detail: 'Home' });
    map.call('Overlays.add', home);
  }

  onOverlayClick = (data) => {
    if (Longdo.isSameObject(data, home)) {
      console.log('At Home');
    }
    map.call('Overlays.list').then(console.log);
  }

  _getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        console.log(this.state)
      },
      (error) => {
        console.log('error')
      },
    )
  }

  navigateToScreen = (routeName) => {
    this.props.navigation.navigate(routeName);
  }

  // function onPressTest1() {
  //   map.call('Overlays.add', home);
  //   map.objectCall(home, 'pop', true);
  //   map.call('location', loc);
  // }

  onPressTest2 = async () => {
    let zoom = await map.call('zoom');
    let location = await map.call('location');
    alert('Longitude : ' + location.lon + '\n' + 'Latitude : ' + location.lat);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Longdo.MapView
          ref={r => (map = r)}
          layer={Longdo.static('Layers', 'GRAY')}
          zoom={15}
          zoomRange={{min: 10, max: 20}}
          location={{ lon: this.state.longitude, lat: this.state.latitude }}
          // ui={false}
          lastView={false}
          // language={'en'}
          onReady={this.onReady}
          onOverlayClick={this.onOverlayClick}
        />
        {/* <Button
          onPress={onPressTest1}
          title="Home"
        /> */}
        <Button
          onPress={this.onPressTest2}
          title="Where am I"
        />
        <Button
          onPress={() => this.navigateToScreen('Auth')}
          title="Check in"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center', // center not working, use stretch (default value)
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});