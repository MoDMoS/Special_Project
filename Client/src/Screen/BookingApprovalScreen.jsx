import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Service from '../api';
import PushNotification from 'react-native-push-notification';
import { ScrollView } from 'react-native-gesture-handler';

const BookingApprovalScreen = () => {
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const EmpID = await AsyncStorage.getItem('ID');
    Service.UserBookingAPI(JSON.parse(EmpID))
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate
  };

  const approveBooking = (booking) => {
    console.log(booking.BookingID, formatDate(booking.Date), booking.StartTime, booking.EndTime);
    Service.DelBookingAPI(JSON.stringify(booking.BookingID), formatDate(booking.Date), booking.StartTime, booking.EndTime)
      .then((response) => {
        // console.log(response.data.affectedRows == 1);
        if (response.data.affectedRows == 1) {
          Alert.alert("ยกเลิกการจองสำเร็จ")
          PushNotification.cancelAllLocalNotifications();
          navigation.navigate('HomeStack')
        } else {
          Alert.alert("Error")
        }

      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สถานะการจองห้องประชุม</Text>
      <ScrollView>
        <View>
          {bookings.map((booking) => (
            <View style={styles.bookingItem} key={booking.BookingID}>
              <Text style={styles.bookingTitle}>หัวข้อการประชุม : {booking.Topic}</Text>
              <Text style={styles.bookingDetails}>
                ห้อง : ห้อง {booking.RoomID}
              </Text>
              <Text style={styles.bookingDetails}>
                วันที่ : {formatDate(booking.Date)}
              </Text>
              <Text style={styles.bookingDetails}>
                เวลา : {booking.StartTime} - {booking.EndTime}
              </Text>
              <Text style={styles.bookingDetails}>
                สถานะ : {booking.Status}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => approveBooking(booking)}>
                <Text style={styles.buttonText}>ยกเลิกการจอง</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookingItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookingDetails: {
    fontSize: 20,
    marginBottom: 8,
  },
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

export default BookingApprovalScreen;
