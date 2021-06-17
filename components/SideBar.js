/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";

import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from './Text';
import * as theme from '../contants/theme';
import Block from './Block';

import { 
    View,
    Dimensions,
    StyleSheet,
    Image,
    SafeAreaView,
    ImageBackground,
    AsyncStorage
} from "react-native";
class SideBar extends Component{
    constructor(){
        super()
        this.getToken("name")
    }
    async getToken(type) {
        try {
            if(type=="name"){
            let userData = await AsyncStorage.getItem("userName");
           
           let data = JSON.parse(userData);
           data=data.toUpperCase();
                this.setState({
                    name:data
                })
        }
          //console.log(data)
          if(data!=null){
              this.setState({
                UserId:data
              })
              if(this.state.UserId!=null)
                this.run();
          }
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
    state={
        name:null
    }

    render(){
        props = this.props;
    return(
    
        <Block center middle>
            <Block >
                
            <ImageBackground source={require('../assets/Src/img/cover.jpg')}
                style={{ height: 180, width:280 ,}}
            >   
           
            <Block marginLeft={20}  middle>
                <SafeAreaView >
                <Image  source={require('../assets/Src/img/icon.jpg')}
                style={styles.logo} />
                <Text  h31 color="white" style={{marginTop:10,}}>{(this.state.name)}</Text>
                </SafeAreaView>
            </Block>
            </ImageBackground>
            <Block >
            
            <DrawerNavigatorItems {...props}/>
            </Block>
    
            </Block>
           
            
        </Block>
    )
    }
}
export default SideBar;
const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    logo:{
        height: 80 ,
        width:80 ,
        marginTop:10,
        borderRadius: 40,
        borderWidth:1,
        
        borderColor: theme.colors.lightblue,
    }
});