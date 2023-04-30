import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import Service from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';
import { CustomPicker } from 'react-native-custom-picker'

const ReportsScreen = () => {
  const [ID, setID] = useState('');
  const [tableData, setTableData] = useState([]);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('ทั้งหมด');
  const thaiMonths = ['ทั้งหมด','มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

  
  const getID = async () => {
    const ID = await AsyncStorage.getItem('ID');
    setID(JSON.parse(ID));
  };

  // useEffect(() => {
    

  //   if (ID) {
  //     Service.ReportsAPI(ID)
  //       .then(response => {
  //         // Create the data table
  //         const data = [];
  //         // console.log(response.data)
  //         response.data.forEach(item => {
  //           const checkInDate = item.CheckInDate || '-';
  //           const checkInTime = item.CheckInTime || '-';
  //           const checkOutTime = item.CheckOutTime || '-';
  //           const shiftDuration = item.ShiftDuration || '-';
  //           data.push([checkInDate, checkInTime, checkOutTime, shiftDuration]);
  //         });          
  //         setTableData(data);
  //         setFilteredData(data); // set filtered data to initial data
  //       })
  //       .catch(error => console.error(error));
  //   }
  // }, []);

  useEffect(() => {
    if(tableData.length === 0){
      getID();
      Service.ReportsAPI(ID)
      .then(response => {
        // Create the data table
        const data = [];
        // console.log(response.data)
        response.data.forEach(item => {
          const checkInDate = item.CheckInDate || '-';
          const checkInTime = item.CheckInTime || '-';
          const checkOutTime = item.CheckOutTime || '-';
          const shiftDuration = item.ShiftDuration || '-';
          data.push([checkInDate, checkInTime, checkOutTime, shiftDuration]);
        });          
        setTableData(data);
        setFilteredData(data); // set filtered data to initial data
      })
      .catch(error => console.error(error));
    }
    if (selectedMonth !== 'ทั้งหมด') {
      const filteredData = filterDataByMonth(tableData, selectedMonth);
      console.log('filteredData:', filteredData);
      setFilteredData(filteredData); // set filtered data to updated data
    } else {
      console.log('no selected month');
      setFilteredData(tableData); // reset filtered data to initial data
    }
  }, [selectedMonth, tableData]);

  const filterDataByMonth = (data, month) => {
    return data.filter(item => {
      const dateArray = item[0].split('/')
      const outputDate = `${dateArray[0]}-${dateArray[1].padStart(2, '0')}-${dateArray[2].padStart(2, '0')}`
      const checkInDate = new Date(outputDate);
      const checkInMonth = thaiMonths[checkInDate.getMonth()+1];
      return checkInMonth === month;
    });
  }

  return (
    <View>
      <CustomPicker
        options={thaiMonths}
        onValueChange={value => { setSelectedMonth(value) }}
        defaultValue={'ทั้งหมด'}
      />
      <DataTable style={{height: '90%'}}>
        <DataTable.Header>
          <DataTable.Title>วันที่</DataTable.Title>
          <DataTable.Title>เข้างาน</DataTable.Title>
          <DataTable.Title>ออกงาน</DataTable.Title>
          <DataTable.Title>ระยะเวลา</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
        {filteredData.map((rowData, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{rowData[0]}</DataTable.Cell>
            <DataTable.Cell>{rowData[1]}</DataTable.Cell>
            <DataTable.Cell>{rowData[2]}</DataTable.Cell>
            <DataTable.Cell>{rowData[3]}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </ScrollView>
        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeStack')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6
  },
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    width: '100%',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ReportsScreen;
