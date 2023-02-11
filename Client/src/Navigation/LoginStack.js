import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screen/LoginScreen";
import RegisScreen from "../Screen/RegisScreen";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
    <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name="Regis" component={RegisScreen} />
    </Stack.Navigator>
}