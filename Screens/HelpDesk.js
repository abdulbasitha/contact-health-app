/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    Image,
    StyleSheet,
    Linking,
    StatusBar,
    Alert
} from "react-native";
import call from 'react-native-phone-call'
import Block from '../components/Block';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/CardView';
import Button_Op from '../components/Button_Yes_No';
import Head from '../components/header';
import List from '../components/ListView';
import * as Operation from '../contants/operation';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from "react-native-gesture-handler";
import * as theme from '../contants/theme';

class Track extends Component {
   
    render() {
        const {navigation} = this.props;
        
        const toggleDrawer = () => {
            navigation.openDrawer();
          }
        return (
            
            <Block center middle  >
                <StatusBar barStyle = "light-content"  backgroundColor = {theme.colors.status_bar} />
                <Head Option={toggleDrawer} name="Help Desk" />
                <Block middle style={{marginTop:30,marginBottom:30}}>
                <Image source={require('../assets/Src/img/logo.png')}
            style={{ height: 130, width:130 }}
        />
            </Block>
                <KeyboardAwareScrollView
   
>

                <Block 
               style={{flexDirection:'row',
               
               
               justifyContent: 'space-around',
              
               alignSelf: 'auto',
                flexWrap: 'wrap',
            
            }}
                >
                    
                    <List icon="phone" name="Help line-1" onPress={()=>call({number: '04832737858', prompt: false}).catch(console.error)}/>
                    <List icon="phone" name="Help line-2" onPress={()=>call({number: '04832737857', prompt: false}).catch(console.error)}/>
                    <List icon="phone" name="Help line-3" onPress={()=>call({number: '04832733251', prompt: false}).catch(console.error)}/>
                    <List icon="phone" name="Help line-4" onPress={()=>call({number: '04832733252', prompt: false}).catch(console.error)}/>
                    <List icon="phone" name="Help line-5" onPress={()=>call({number: '04832733253', prompt: false}).catch(console.error)}/>
                </Block>  

             </KeyboardAwareScrollView>
              

             

             
             
             
            </Block>   
            
        );
    }
}
export default Track;

const styles = StyleSheet.create({
  
});

{/* <StatusBar barStyle = "light-content"  backgroundColor = "#2549fa" />
<Head Option={toggleDrawer} name="Home"/>
<Block flex={4}  center middle>
<KeyboardAwareScrollView
   
>


</KeyboardAwareScrollView> */}