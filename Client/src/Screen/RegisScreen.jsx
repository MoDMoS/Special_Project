import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RegisScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const data = JSON.parse(route.params.data)

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { marginTop: 50 }]}>Employee ID:</Text>
      <TextInput style={styles.input} value={data.EmployeeID} editable={false} />

      <Text style={styles.label}>Title Name:</Text>
      <TextInput style={styles.input} value={data.TitleName} editable={false} />

      <Text style={styles.label}>First Name:</Text>
      <TextInput style={styles.input} value={data.FirstName} editable={false} />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput style={styles.input} value={data.LastName} editable={false} />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput style={styles.input} value={data.PhoneNumber} editable={false} />

      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={data.Email} editable={false} />

      <Text style={styles.label}>Department Name:</Text>
      <TextInput style={styles.input} value={data.DepartmentName} editable={false} />

      <Text style={styles.label}>Role Name:</Text>
      <TextInput style={styles.input} value={data.RoleName} editable={false} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pincode', { data: JSON.stringify(data) })}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  button: {
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