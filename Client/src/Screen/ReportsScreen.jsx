import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import Service from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';

const ReportsScreen = () => {
  const [ID, setID] = useState('');
  const [tableData, setTableData] = useState([]);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

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
          setFilteredData(data); // set filtered data to initial data
        })
        .catch(error => console.error(error));
    }
  }, []);

  useEffect(() => {
    // console.log('selectedMonth:', selectedMonth);
    
    if (selectedMonth) {
      const filteredData = filterDataByMonth(tableData, selectedMonth);
      console.log('filteredData:', filteredData);
      setFilteredData(filteredData); // set filtered data to updated data
    } else {
      console.log('no selected month');
      setFilteredData(tableData); // reset filtered data to initial data
    }
  }, [selectedMonth, tableData]);
  ;

  const filterDataByMonth = (data, month) => {
    return data.filter(item => {
      const dateArray = item[0].split('/')
      const outputDate = `${dateArray[0]}-${dateArray[1].padStart(2, '0')}-${dateArray[2].padStart(2, '0')}`
      const checkInDate = new Date(outputDate);
      const checkInMonth = thaiMonths[checkInDate.getMonth()];
      
      // console.log('checkInMonth:', checkInMonth, 'selectedMonth:', month);
  
      return checkInMonth === month;
    });
  }
  

  return (
    <View>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
        prompt="เลือกเดือน"
      >
        <Picker.Item label="ทั้งหมด" value={null} />
        {thaiMonths.map((month, index) => (
          <Picker.Item key={index} label={month} value={month} />
        ))}
      </Picker>
      <ScrollView style={{ height: '86%' }}>
        <Table>
          <TableWrapper>
            <Row data={['วันที่', 'เข้างาน', 'ออกงาน', 'ระยะเวลา']} sxtyle={styles.head} textStyle={{ ...styles.text, fontWeight: 'bold' }} />
            {filteredData.map((rowData, index) => (
              <Row key={index} data={rowData} style={{ ...(index % 2 && { backgroundColor: '#F7F6E7' }), ...styles.row }} textStyle={styles.text} /> ))
            }
          </TableWrapper>
        </Table>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeStack')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
