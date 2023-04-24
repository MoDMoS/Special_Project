/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    requestPermissions: Platform.OS === 'ios'
})

PushNotificationIOS.requestPermissions();

AppRegistry.registerComponent(appName, () => App);
