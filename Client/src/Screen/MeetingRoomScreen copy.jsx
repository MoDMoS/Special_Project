import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Service from '../api';
import { useNavigation } from '@react-navigation/native';

const MeetingRoomScreen = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [minStartTime, setMinStartTime] = useState(new Date());
  const [minEndTime, setMinEndTime] = useState(new Date());
  const [show, setShow] = useState(null);
  const navigation = useNavigation();

  const minimumTime = new Date();
  minimumTime.setHours(9, 0, 0);
  const maxStartTime = new Date();
  maxStartTime.setHours(17, 0, 0, 0);
  const maxEndTime = new Date();
  maxEndTime.setHours(18, 0, 0, 0);

  useEffect(() => {
    const minEndTime = new Date(start);
    minEndTime.setMinutes(minEndTime.getMinutes() + 30);
    setMinEndTime(minEndTime);
    if (end < minEndTime) {
      setEnd(minEndTime);
    }
  }, [start]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes
      }`;
  };

  const [textDate, setTextDate] = useState(formatDate(date));
  const [textStart, setStartTime] = useState(formatTime(date));
  const [textEnd, setEndTime] = useState(formatTime(end));

  const onChangeTextDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setTextDate(currentDate)
    console.log(textDate);
  };

  const onChangeStartTime = (event, time) => {
    const currentStart = time || start;
    if (currentStart < minimumTime) {
      minimumTime.setFullYear(currentStart.getFullYear());
      minimumTime.setMonth(currentStart.getMonth());
      minimumTime.setDate(currentStart.getDate());
      // setStart(minimumTime);
      setStartTime(minimumTime);
    } else {
      // setStart(currentStart);
      setStartTime(currentStart);
      // console.log(textStart);
    }
  };

  const onChangeEndTime = (event, time) => {
    const currentEnd = time || end;
    setEndTime(currentEnd);
  };

  const handleSubmit = () => {
    Service.MeetingAPI(textDate, textStart, textEnd)
      .then((response) => {
        setMeetingRooms(response.data)
        setShow(true)
      })
      .catch((err) => {
        console.log(err);
      })
  };

  handleItemPress = (itemId) => {
    navigation.navigate('Booking', { RoomName: itemId.RoomName, Date: textDate, Start: textStart, End: textEnd });
  }

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text>วันที่ต้องการจอง</Text>
        <DateTimePicker
          // testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeTextDate}
          locale={'th-TH'}
          minimumDate={new Date()}
        />
      </View>
      <View style={styles.row}>
        <Text>ช่วงเวลาที่ต้องการจอง</Text>
        <DateTimePicker
          value={start}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
          minimumDate={minStartTime}
          maximumDate={maxStartTime}
        />
        <DateTimePicker
          value={end}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
          minimumDate={minEndTime}
          maximumDate={maxEndTime}
        />
      </View>
      <View>
          <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonTextStyle}>ยืนยัน</Text>
        </TouchableOpacity>
      </View>
      {show == true ? (
        <ScrollView>
          {Array.isArray(meetingRooms) && meetingRooms.map((room, index) => (
            <TouchableOpacity
              key={index}
              style={styles.roomContainer}
              onPress={() => this.handleItemPress(room)}
            >
              <Text style={styles.roomName}>{room.RoomName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
  },
  column: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  roomName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  roomContainer: {
    backgroundColor: '#FFFFFF',
    width: 350,
    borderRadius: 8,
    padding: 20,
    margin: 10
  },
});

export default MeetingRoomScreen;
