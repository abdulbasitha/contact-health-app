/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,PermissionsAndroid, Platform
} from "react-native";
import Home from './Home';
class Permission extends Component {
    componentDidMount(){
       this.requestCameraPermission();
    }
     requestCameraPermission=async () =>{
       if(Platform.OS==="android"){
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Contact Helth App Location Permission',
              message:
                'Contact Helth needs access to your location ' 
                ,
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
          } else {
            console.log('location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
      }
    
    render() {
        return (
            <Home />
        );
    }
}
export default Permission;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});