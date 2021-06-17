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
import * as theme from '../contants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Block from "./Block";

const {width} = Dimensions.get("window");
const height = Dimensions.get('window').height;
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
            <TouchableOpacity
            style={ButtonStyle}{...props}
            activeOpacity={opacity||.8}
            
            >   
            <Block style={{flexDirection:"row"}} >
            <Block   style={{justifyContent:"space-around"}} center>
                <Text><Icon name={props.icon} size={30} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>
                </Block>
                <Block flex={2} middle >
                <Text h4>{props.name}</Text>
                </Block>
               
                </Block>
             </TouchableOpacity>
           
        );
    }
}

export default Button;




const styles = StyleSheet.create({
   button:{
    backgroundColor:theme.colors.white,
    borderRadius:4,
  
  
    marginTop:28,
    fontSize:15,
    height:height/16,
  
    borderWidth:1,
    borderColor:theme.colors.blue
   },
   full:{
    width:width - 50
   },
   white: { backgroundColor: theme.colors.white, },
});

// width: 325px;
// height: 50px;
// background: transparent;
