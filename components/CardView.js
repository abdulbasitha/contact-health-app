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
                <Block center middle>
                <Text><Icon name={props.icon} size={30} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>
                </Block>
                <Block center middle style={{marginBottom:10}}>
                <Text center h31>{props.name}</Text>
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
    marginLeft:10,
    marginRight:10,
    marginTop:28,
    fontSize:15,
    height:150,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:theme.colors.blue
   },
   full:{
       width:(width-50)/2
   },
   white: { backgroundColor: theme.colors.white, },
});

// width: 325px;
// height: 50px;
// background: transparent;
