/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Text from './Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as theme from '../contants/theme';
import Block from "./Block";
const {width} = Dimensions.get("window");
class Button extends Component {
    
    render() {
        const {style,full,opacity,color,...props} =this.props;
        const ButtonStyle = [
               styles.button,
               styles.full,
               color && color === 'white' && styles.white,
               
                style,
                
                
                

        ] ;
       

        return (
            <View  style={{marginRight:10}}>
            <TouchableOpacity
            style={ButtonStyle}{...props}
            activeOpacity={opacity||.8}
            
            >
            <Text><Icon name="phone" size={30} style={{marginBottom:10}} color={theme.colors.white} /></Text>
            </TouchableOpacity>
         </View>
        );
    }
}

export default Button;




const styles = StyleSheet.create({
    main:{
        flex:0,
        alignItems:"center",
        position:"absolute",
        justifyContent:"space-between"
    },
   button:{
    backgroundColor:theme.colors.blue,
    borderRadius:60/2,
    fontSize:15,
    height:60,
    
    alignItems:'center',
    justifyContent:'center',
    position:"absolute",
  
   },
   full:{
       width:60,
     
       
   },
   white: { backgroundColor: theme.colors.white, },
});


