
import React, { Component } from "react";
import RNCalendarEvents from 'react-native-calendar-events';
import {
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";
//import PushNotificationAndroid from 'react-native-push-notification'
class Test extends Component {
    constructor(){
        super()



        RNCalendarEvents.saveEvent('Update Your Health Condition - Contact Health', {
            startDate: '2020-03-31T19:26:00.000Z',
            endDate: '2020-03-31T19:26:00.000Z',
            alarms: [{
              date: '2020-03-31T19:21:00.000Z'
            }]
          })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Testw</Text>
            </View>
        );
    }
}
export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});