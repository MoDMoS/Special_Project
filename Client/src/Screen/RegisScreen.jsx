import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function RegisScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.data;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.label, {marginTop: 50}]}>
          รหัสประจำตัวพนักงาน:
        </Text>
        <TextInput
          style={styles.input}
          value={data.EmployeeID}
          editable={false}
        />

        <Text style={styles.label}>คำนำหน้า:</Text>
        <TextInput
          style={styles.input}
          value={data.TitleName}
          editable={false}
        />

        <Text style={styles.label}>ชื่อ:</Text>
        <TextInput
          style={styles.input}
          value={data.FirstName}
          editable={false}
        />

        <Text style={styles.label}>นามสกุล:</Text>
        <TextInput
          style={styles.input}
          value={data.LastName}
          editable={false}
        />

        <Text style={styles.label}>เบอร์โทร:</Text>
        <TextInput
          style={styles.input}
          value={data.PhoneNumber}
          editable={false}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={data.Email} editable={false} />

        <Text style={styles.label}>แผนก:</Text>
        <TextInput
          style={styles.input}
          value={data.DepartmentName}
          editable={false}
        />

        <Text style={styles.label}>ตำแหน่ง:</Text>
        <TextInput
          style={styles.input}
          value={data.RoleName}
          editable={false}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.buttonR}
            onPress={() =>
              navigation.goBack()
            }>
            <Text style={styles.buttonText}>ยกเลิก</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonG}
            onPress={() =>
              navigation.navigate('RegisPincode', {data: JSON.stringify(data)})
            }>
            <Text style={styles.buttonText}>ถูกต้อง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(252, 206, 136, 0.75)',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  buttonR: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 20,
  },
  buttonG: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
  },
});
