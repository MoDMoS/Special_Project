import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../HomeScreen';
import MessageScreen from '../MessageScreen';
import MapScreen from '../MapScreen';
import MeetingScreen from '../MeetingRoomScreen';
import ContactScreen from '../ContactScreen';

const Drawer = createDrawerNavigator();

export default function NavDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen={}} />
      <Drawer.Screen name="Message" component={MeetingScreen} />
    </Drawer.Navigator>
  );
}