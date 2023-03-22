import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "../Screen/MapScreen";
import AuthScreen from "../Screen/AuthScreen";

const Stack = createNativeStackNavigator();

export default function MapStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Map' component={MapScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
    )

}