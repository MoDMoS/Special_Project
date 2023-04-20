import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../Screen/MapScreen";
import CheckInScreen from "../Screen/CheckInScreen";
import CheckOutScreen from "../Screen/CheckOutScreen";
import ReportsScreen from "../Screen/ReportsScreen";

const Stack = createNativeStackNavigator();

export default function MapStack({ navigation, route }) {
  const { initialRouteName } = route.params;

    return (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Map' component={MapScreen} options={{unmountOnBlur: true,}}/>
            <Stack.Screen name="CheckIn" component={CheckInScreen} options={{unmountOnBlur: true,}}/>
            <Stack.Screen name="CheckOut" component={CheckOutScreen} options={{unmountOnBlur: true,}}/>
            <Stack.Screen name="Reports" component={ReportsScreen} options={{unmountOnBlur: true,}}/>
        </Stack.Navigator>
    )

}