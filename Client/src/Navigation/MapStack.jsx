import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../Screen/MapScreen";
import CheckInScreen from "../Screen/CheckInScreen";
import CheckOutScreen from "../Screen/CheckOutScreen";

const Stack = createNativeStackNavigator();

export default function MapStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Map' component={MapScreen} />
            <Stack.Screen name="CheckIn" component={CheckInScreen} />
            <Stack.Screen name="CheckOut" component={CheckOutScreen} />
        </Stack.Navigator>
    )

}