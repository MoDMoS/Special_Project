import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './Screen/LoginScreen';
import HomeStack from './Navigation/HomeStack';
import MessageScreen from './Screen/MessageScreen';
import MapScreen from './Screen/MapScreen';
import MeetingScreen from './Screen/MeetingRoomScreen';
import ContactScreen from './Screen/ContactScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function Root() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen name="Login" 
            component={LoginScreen} 
            options={{
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }}
          />  
          <Drawer.Screen name="HomeStack" 
            component={HomeStack} 
            options={{
              DrawerBarLabel: 'Home',
            }}
          />
          <Drawer.Screen name="Message" 
            component={MessageScreen} 
            options={{
              DrawerBarLabel: 'Message',
            }}
          />
          <Drawer.Screen name="Map" 
            component={MapScreen} 
            options={{
              DrawerBarLabel: 'Check in',
            }}
          />
          <Drawer.Screen name="Meeting" 
            component={MeetingScreen} 
            options={{
              DrawerBarLabel: 'Meeting room',
            }}
          />
          <Drawer.Screen name="Contacts" 
            component={ContactScreen} 
            options={{
              DrawerBarLabel: 'Contacts',
            }}
          />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}
