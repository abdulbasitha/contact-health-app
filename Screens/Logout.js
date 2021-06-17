/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";
import Navigator from '../navigator/AppNavigator';
class Logout extends Component {
    constructor(){
        super();
        
    }
   componentDidMount(){
        this.removeItemValue("userData");
        this.props.navigation.navigate("Menu")
   }
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }
    render() {
        return (
           
                <Navigator />
            
        );
    }
}
export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});