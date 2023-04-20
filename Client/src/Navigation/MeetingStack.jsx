import { createStackNavigator } from '@react-navigation/stack';

import MeetingRoomScreen from '../Screen/MeetingRoomScreen';
import BookingScreen from '../Screen/BookingScreen';

const Stack = createStackNavigator();

export default function MeetingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Meeting" component={MeetingRoomScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  )
}
