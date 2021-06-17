/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, {Component} from "react";
import {createAppContainer, ScrollView} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    AppState,
    Alert
} from "react-native";
//import MapF from './App';
//import Geolocation from "@react-native-community/geolocation";
import firebase from "./config/firebase";
 class Login extends Component {

     state = {

        email: null,
        pass: null,
         error:null,
         loading:false

 //{()=>this.props.navigation.navigate('Track')}
    }
    Loggin = () =>{
         firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass)
             .then(this.Logginsucess)
             .catch((err)=>{console.log(err)})
    }
     Logginsucess =()=>{
         this.setState({
             error:'',
             loading:false
         })
         console.log("Login Success")
     }

     render() {

        return (
            <ScrollView style={styles.container} >

                <View style={styles.head} >
                    <Text style={styles.signupText}>Login</Text>
                </View>

                <View style={styles.registersection}>

                    <View style={styles.cardview}>

                        <View style={styles.elememts}>
                            <TextInput style={styles.TextInput}  placeholder="email" autoCompleteType="email"
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.elememts}>
                            <TextInput style={styles.TextInput}  placeholder="Password"  onChangeText={(pass) => this.setState({pass})}/>
                        </View>

                        <View style={styles.submit}>
                            <TouchableOpacity style={styles.button} onPress={this.Loggin} >
                                <Text> Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </ScrollView>


        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    head: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:20
    },
    signupText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom:20
    },
    registersection: {

        flex: 1,
        paddingHorizontal: 20,


        justifyContent: 'center',
        alignContent:'center'
    },
    elememts: {
        backgroundColor: 'gray',
        margin: 10,

    },
    submit: {
        backgroundColor: '#3498db',
        alignItems: 'center',
        padding: 20,
        margin: 10,
    },
    button: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',

    },
    TextInput:{
        margin:"4%"
    },
    cardview: {

    }

});

const AppNavigator = createStackNavigator({
    Login:{
    screen: Login },




});
export default createAppContainer(AppNavigator);

