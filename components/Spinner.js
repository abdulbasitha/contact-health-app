/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
    
} from "react-native";
import * as theme from '../contants/theme';
class Loader extends Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
           
            <ActivityIndicator size="large" color={theme.colors.blue} />
         
          </View>
        );
    }
}
export default Loader;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })
  