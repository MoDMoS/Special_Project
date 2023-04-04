import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import Service from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportsScreen = () => {
  const [checkinData, setCheckinData] = useState([]);
  const [ID, setID] = useState('');
  const [tableData, setTableData] = useState([]);

  const getID = async () => {
    const ID = await AsyncStorage.getItem('ID');
    setID(JSON.parse(ID));
  };

  useEffect(() => {
    getID();

    if (ID) {
      Service.ReportsAPI(ID)
        .then(response => {
          setCheckinData(response.data);
          // Create the data table
          const data = [];
          console.log(response.data)
          response.data.forEach(item => {
            data.push([item.CheckInDate, item.CheckInTime, item.CheckOutTime]);
          });
          setTableData(data);
        })
        .catch(error => console.error(error));
    }
  }, [ID]);

  return (
    <View style={styles.container}>
      <Table>
        <Row
          data={['วันที่','เวลาเข้างาน', 'เวลาออกงาน']}
          style={styles.head}
          textStyle={styles.text}
        />
        
        <Rows data={tableData} textStyle={{fontSize: 16, color: 'black', fontWeight: 'bold'}} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  heading: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});

export default ReportsScreen;
