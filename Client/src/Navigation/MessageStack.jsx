import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MessageScreen from "../Screen/MessageScreen";
import DetailScreen from "../Screen/DetailScreen";

const Stack = createNativeStackNavigator();

export default function MessageStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Message' component={MessageScreen} />
            <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
    )
}