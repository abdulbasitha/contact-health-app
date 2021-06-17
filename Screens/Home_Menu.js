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
    Alert,
} from "react-native";
import call from 'react-native-phone-call'
import Block from '../components/Block';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/CardView';
import Button_Op from '../components/Button_Yes_No';
import Head from '../components/header';
import * as Operation from '../contants/operation';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from "react-native-gesture-handler";
import * as theme from '../contants/theme';
import FloatB from '../components/Floating_Button';
class Track extends Component {
   
    render() {
        const {navigation} = this.props;
        
        const toggleDrawer = () => {
            navigation.openDrawer();
          }
        return (
            <Block>
            <Block center middle  >
                <StatusBar barStyle = "light-content"  backgroundColor = {theme.colors.status_bar} />
                <Head Option={toggleDrawer} name="Home" />
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
                    
                    <Card icon="heartbeat" name= "ആരോഗ്യസ്ഥിതി അപ്ഡേറ്റ് ചെയ്യുക" onPress={()=>this.props.navigation.navigate('Members')}/>
                    <Card icon="plus" name="അംഗങ്ങളെ ചേർക്കുക" onPress={()=>this.props.navigation.navigate('Add')}/>
                    <Card icon="history" name="എന്റെ പ്രവർത്തനങ്ങൾ" onPress={()=>this.props.navigation.navigate('History')}/>
                    <Card icon="phone" name="ഹെൽപ്പ് ഡെസ്ക്" onPress={()=>this.props.navigation.navigate('Help')}/>

                  
                    
                   
                   
                
             </Block>  

             </KeyboardAwareScrollView>
              
            </Block>   
               
                <FloatB onPress={()=>call({number: '04832733256', prompt: false}).catch(console.error)} style={{bottom:25,alignSelf:"flex-end"}}/>
              
        
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