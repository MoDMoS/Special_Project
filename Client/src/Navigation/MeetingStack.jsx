import { createStackNavigator } from '@react-navigation/stack';

import MeetingRoomScreen from '../Screen/MeetingRoomScreen';
import BookingScreen from '../Screen/BookingScreen';
import BookingApprovalScreen from '../Screen/BookingApprovalScreen';

const Stack = createStackNavigator();

export default function MeetingStack({ navigation, route }) {
  const { initialRouteName } = route.params;

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Meeting" component={MeetingRoomScreen} options={{unmountOnBlur: true,}}/>
            <Stack.Screen name="Booking" component={BookingScreen} options={{unmountOnBlur: true,}}/>
            <Stack.Screen name="Apporval" component={BookingApprovalScreen} options={{unmountOnBlur: true,}}/>
    </Stack.Navigator>
  )
}
