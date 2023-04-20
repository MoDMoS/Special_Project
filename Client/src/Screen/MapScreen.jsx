import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, SafeAreaView } from 'react-native';
import Longdo from 'longdo-map-react-native';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Service from '../api';

Longdo.apiKey = process.env.REACT_APP_KEY_API_MAP;
let map;

export default function MapScreen({ route }) {
  const [location, setLocation] = useState(null);
  const [check, setCheck] = useState(null);
  const navigation = useNavigation();
  const homeRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log('error');
      },
    );

    if (isFocused) {
      // Reload the screen
      console.log('Screen reloaded');
      checkInOrOut();
    }
  }, [isFocused]);

  const onReady = () => {
    console.log('ready ' + new Date());
    map.call(
      'Overlays.load',
      Longdo.object('Overlays.Object', 'A00146852', 'LONGDO'),
    );
    const { longitude, latitude } = location;
    const loc = { lon: longitude, lat: latitude };
    const home = Longdo.object('Marker', loc, { detail: 'Home' });
    homeRef.current = home;
    map.call('Overlays.add', home);
  };

  const onOverlayClick = data => {
    if (Longdo.isSameObject(data, homeRef.current)) {
      console.log('At Home');
    }
    map.call('Overlays.list').then(console.log);
  };

  const navigateToScreen = async routeName => {
    let ID = await AsyncStorage.getItem('ID');
    ID = JSON.parse(ID)
    const loc = await map.call('location');
    navigation.navigate(routeName, { data: ID, location: loc });
  };

  const checkInOrOut = async () => {
    let ID = await AsyncStorage.getItem('ID');
    ID = JSON.parse(ID)
    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    // console.log(ID, date);
    Service.Check_InorOut(ID, date)
      .then(response => {
        // console.log(JSON.stringify(response.data) == "[]");
        setCheck(JSON.stringify(response.data));
      })
      .catch(error => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Longdo.MapView
        ref={r => (map = r)}
        layer={Longdo.static('Layers', 'GRAY')}
        zoom={18}
        zoomRange={{ min: 15, max: 20 }}
        location={location && { lon: location.longitude, lat: location.latitude }}
        onReady={onReady}
        onOverlayClick={onOverlayClick}
      />
      {check == "[]" ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('CheckIn')}>
          <Text style={styles.buttonText}>ลงชื่อเข้างาน</Text>
        </TouchableOpacity>
      ) : null}
      {check !== "[]" ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('CheckOut')}>
          <Text style={styles.buttonText}>ลงชื่อออกงาน</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
