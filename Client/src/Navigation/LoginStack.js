import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screen/LoginScreen';
import RegisScreen from '../Screen/RegisScreen';
import RefScreen from '../Screen/RefScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen"
                component={LoginScreen}
            />
            <Stack.Screen name="RefScreen"
                component={RefScreen}
            />
            <Stack.Screen name="RegisScreen"
                component={RegisScreen}
            />
        </Stack.Navigator>
    );
}