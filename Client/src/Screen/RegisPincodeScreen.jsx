import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisPincodeScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const route = useRoute();
  const data = JSON.parse(route.params.data);

  const handlePinChange = (value, index) => {
    // update the pin state with the entered value
    const newPin = pin.split('');
    newPin[index] = value;
    setPin(newPin.join(''));

    // move focus to the next input box
    if (value !== '' && index < 3) {
      refs[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      AsyncStorage.setItem('Pincode', JSON.stringify(pin));
      AsyncStorage.setItem('ID', JSON.stringify(data.EmployeeID));
      navigation.navigate('RegisAuth', {
        pin: JSON.stringify(pin),
        EmployeeID: JSON.stringify(data.EmployeeID),
      })
    } else {
      Alert.alert('Please enter pincode');
    }
  };

  const refs = [];

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={{fontSize: 50, marginTop: 200}}>Pin Code</Text>
        <Text style={{fontSize: 20}}>ใส่รหัสผ่านเพื่อใช้งานแอพในภายหลัง</Text>
        <View style={styles.row}>
          <TextInput
            ref={ref => (refs[0] = ref)}
            style={styles.pinInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={value => handlePinChange(value, 0)}
            value={pin[0]}
            secureTextEntry={true}
          />
          <TextInput
            ref={ref => (refs[1] = ref)}
            style={styles.pinInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={value => handlePinChange(value, 1)}
            value={pin[1]}
            secureTextEntry={true}
          />
          <TextInput
            ref={ref => (refs[2] = ref)}
            style={styles.pinInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={value => handlePinChange(value, 2)}
            value={pin[2]}
            secureTextEntry={true}
          />
          <TextInput
            ref={ref => (refs[3] = ref)}
            style={styles.pinInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={value => handlePinChange(value, 3)}
            value={pin[3]}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(252, 206, 136, 0.75)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  pinInput: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 100,
    marginHorizontal: 5,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  button: {
    marginTop: 50,
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisPincodeScreen;
