import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Service from '../api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [Id, setId] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    Service.CheckUserAPI(email, Id)
      .then((response) => {
        const Data = response.data;
        console.log(response.data);
        if (Data[0]) {
          navigation.navigate('RegisScreen', { data: JSON.stringify(Data[0]) })
        } else {
          Alert.alert("Error ID or Email not correctly");
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../asset/Logo.png')} style={styles.logo} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20}}>รหัสประจำตัวพนักงาน</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={Id}
        onChangeText={text => setId(text)}
        autoCapitalize="none"
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20}}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={handleSubmit}>
        <Text style={styles.buttonTextStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '80%',
    height: '20%',
    marginTop: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'rgba(252, 206, 136, 0.8)',
  },
  input: {
    width: '95%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  button: {
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginVertical: 10,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    padding: 10,
  },
});

export default LoginScreen;
