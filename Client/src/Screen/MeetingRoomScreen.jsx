import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Service from '../api';

const MeetingRoomScreen = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [minStartTime, setMinStartTime] = useState(new Date());
  const [minEndTime, setMinEndTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [startFormatted, setStartFormatted] = useState('')
  const [endFormatted, setEndFormatted] = useState('')
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
    if (isFocused) {
      setMeetingRooms([])
      setShow(false)
      console.log('Screen reloaded');
    }
  }, [start, isFocused]);

  const onChangeTextDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onChangeStartTime = (event, selectedTime) => {
    const selectedDate = selectedTime || start;
    if (selectedDate < minimumTime) {
      minimumTime.setFullYear(selectedDate.getFullYear());
      minimumTime.setMonth(selectedDate.getMonth());
      minimumTime.setDate(selectedDate.getDate());
      setStart(selectedDate);
      setMinStartTime(selectedDate);
      const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setStartFormatted(formattedTime);
    } else {
      setStart(selectedDate);
      const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setStartFormatted(formattedTime);
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    const selectedDate = selectedTime || end;
    setEnd(selectedDate);
    const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEndFormatted(formattedTime);
  };

  const handleSubmit = () => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const startTime = startFormatted || start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const endTime = endFormatted || end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    Service.MeetingAPI(formattedDate, startTime, endTime)
      .then((response) => {
        // console.log(response.data);
        setMeetingRooms(response.data)
        setShow(true)
      })
      .catch((err) => {
        console.log(err);
      })
  };

  handleItemPress = (itemId) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const startTime = startFormatted || start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const endTime = endFormatted || end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    navigation.navigate('Booking', { RoomID: itemId.RoomID, RoomName: itemId.RoomName, Date: formattedDate, Start: startTime, End: endTime });
  }

  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text>วันที่ต้องการจอง</Text>
        <DateTimePicker
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
        />
        <DateTimePicker
          value={end}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
          minimumDate={minEndTime}
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
      <View>
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
        {show == false ? (
          <View>
            <Text style={styles.roomName}>กรุณาเลือกวันและเวลาที่ต้องการจอง</Text>
          </View>
        ) : null}
      </View>

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
