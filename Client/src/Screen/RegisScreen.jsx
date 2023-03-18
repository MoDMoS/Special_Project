import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RegisScreen() {
  const navigation = useNavigation();
  const [Id, setId] = useState('');

  const route = useRoute();

  const data = JSON.parse(route.params.data)

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Employee ID</Text>
        <TextInput
          style={styles.input}
          placeholder="ID"
          value={data.EmployeeID}
          onChangeText={(text) => setId(text)}
          autoCapitalize="none"
          editable={false}
        />
        <Button
          title="Back"
          onPress={() => {
            navigation.goBack();
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '70%',
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(252, 206, 136, 0.8)',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  text: {
    textAlign: 'left',
    fontSize: 16,
  }
});