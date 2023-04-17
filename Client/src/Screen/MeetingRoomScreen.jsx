import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Service from '../api';

const MeetingRoomScreen = () => {
  const [meetingRooms, setMeetingRooms] = useState([]);

  useEffect(() => {
    Service
  }, []);

  const bookRoom = (roomId, timeSlot) => {
    // Implement booking logic here
  };

  return (
    <View>
      {meetingRooms.map((room) => (
        <TouchableOpacity
          key={room.id}
          style={styles.roomContainer}
          onPress={() => bookRoom(room.id, '10:00 AM - 11:00 AM')}
        >
          <Text style={styles.roomName}>{room.name}</Text>
          <Text style={styles.roomDescription}>{room.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  roomContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 8
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  roomDescription: {
    fontSize: 14,
    marginTop: 8
  }
});

export default MeetingRoomScreen;
