/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Model,
    StatusBar,
    AsyncStorage,
    PermissionsAndroid,
    Platform
    
} from "react-native";
import 'react-native-gesture-handler';
import Navigator from './navigator/AppNavigator';
import Core from './navigator/Screens';
import Splash from './Screens/Splash';
import Geolocation from "@react-native-community/geolocation";
import Track from './Screens/Track';
//import MapF from "./App";
import firebase, { auth } from "firebase";
import config from './config/firebase';
import * as json from './contants/json';

const url = json.url;

class SplashtoLogin extends Component {

   
    async getToken(user) {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = JSON.parse(userData);
          //console.log(data)

          if(data!=null){
              if(this.state.locationPermission==true)
                    this.getLocation();   
             //console.log(this.state.location)
              this.setState({
                  isLogin:true,
                  userId:data
              })
          }
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }


    constructor(props){
        super(props);
        this.state = {
            timePassed: false,
            logginIn:false,
            userId:null,
            location:null,
            locationPermission:false
        };
    }
    state={
        
        isLoadingComplete: false,
        isLogin:false
    }
    componentDidMount() {

        this.PermissionCheck();
        this.getToken();
        setTimeout( () => { 
            
            this.setTimePassed();
        },1000);
    }
    PermissionCheck = async ()=>{
        if(Platform.OS=="android"){
        try {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === true) {
             this.setState({
                 locationPermission:true
             })
            } else {
                this.setState({
                    locationPermission:false
                })
            }
          } catch (err) {
            console.warn(err);
          }
        }
        else{
            this.setState({
                locationPermission:true
            })
        }
    }
    getLocation = () =>{
        return Geolocation.watchPosition((pos)=>{
            this.setState({
            location:pos
        })
        // console.log(this.state.userId)
        this.saveLoc(pos.coords.latitude,pos.coords.longitude,this.state.userId)
        })
   
        
    }
    saveLoc = (lat,lng,id) =>{
        fetch(url+"location/"+`${id}`+`?lat=${lat}&lng=${lng}`).catch((err =>{
            console.log("error")
        }))
          .then((response) => response.json()).catch(err =>{
            console.log(url+"location/"+`${id}/`+`?lat=${lat}&lng=${lng}`)
          })
          .then((responseJson) => {
           console.log(responseJson);
        
            
          })
          .catch((error) =>{
            console.error(error);
          });
        
    }


    setTimePassed() {
        this.setState({timePassed: true});
        
    }
   
    render() {
        
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        
        if (!this.state.timePassed) {
            
            return <Splash />;
        }
        else {
            if(this.state.isLogin)
            return <Core />
            else
            return <Navigator />
            
        }
    }
}
export default SplashtoLogin;



