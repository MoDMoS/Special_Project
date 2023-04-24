import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Service from '../api';

const RefScreen = ({ navigation }) => {
  const [refcode, setRefcode] = useState('');
  const route = useRoute();
  const data = JSON.parse(route.params.data);

  useEffect(() => {
    Service.RefCodeAPI(data.EmployeeID, data.Email)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        error => console.error(error)
      })
  }, [])

  const handleRefcodeChange = (value) => {
    setRefcode(value);
  };

  const handleSubmit = () => {
    if (refcode.length === 6) {
      // console.log(refcode);
      Service.CheckRefAPI(data.Email, data.EmployeeID, refcode)
        .then((response) => {
          // console.log(response.data[0]);
          if (response.data[0] !== undefined) {
            navigation.navigate('RegisScreen', {data: data})
          }
          else {
            Alert.alert("รหัสยืนยันไม่ถูกต้อง กรุณาลองอีกครั้ง")
          }
        })
        .catch((error) => { console.log(error) })
    } else {
      Alert.alert('กรุณาใส่รหัสยืนยันให้ครบ');
    }
  };

  const textInputs = [];

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={{ fontSize: 40, marginTop: 200, marginBottom: 10 }}>Reference Code</Text>
        <Text style={{ fontSize: 20 }}>รหัสยืนยันได้ส่งไปที่เมลของคุณแล้ว</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            maxLength={6}
            onChangeText={(value) => handleRefcodeChange(value)}
            value={refcode}
            autoCapitalize="none"
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
  input: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: 'black',
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

export default RefScreen;
