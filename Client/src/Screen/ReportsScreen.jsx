import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Service from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ReportsScreen = () => {
  const [ID, setID] = useState('');
  const [tableData, setTableData] = useState([]);
  const navigation = useNavigation();

  const getID = async () => {
    const ID = await AsyncStorage.getItem('ID');
    setID(JSON.parse(ID));
  };

  useEffect(() => {
    getID();

    if (ID) {
      Service.ReportsAPI(ID)
        .then(response => {
          // Create the data table
          const data = [];
          // console.log(response.data)
          response.data.forEach(item => {
            data.push([item.CheckInDate, item.CheckInTime, item.CheckOutTime, item.ShiftDuration]);
          });
          setTableData(data);
        })
        .catch(error => console.error(error));
    }
  }, [ID]);

  return (
    <View style={styles.container}>
      <Table style={{height: '95%'}}>
        <Row data={['วันที่', 'เข้างาน', 'ออกงาน', 'ระยะเวลา']} style={styles.head} textStyle={styles.text}/>
        <Rows data={tableData} textStyle={{fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 5}} />
      </Table>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeStack')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
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

export default ReportsScreen;
