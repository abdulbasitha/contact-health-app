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
    SafeAreaView,
    KeyboardAvoidingView,
    AsyncStorage
} from "react-native";
import FloatB from '../components/Floating_Button';
import Block from '../components/Block';
import Text from '../components/Text';
import InputArea from '../components/InputArea';
import Button from '../components/Button';
import Check from '../components/checkbox';
import Button_Op from '../components/Button_Yes_No';
import Head from '../components/header';
import * as Operation from '../contants/operation';
import firebase, { auth } from "firebase";
import config from '../config/firebase';

import * as theme from '../contants/theme';
import { ScrollView } from "react-native-gesture-handler";
import * as json from '../contants/json';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Spinner';
const url = json.url;
const ans = []
class Track extends Component {
    componentDidMount(){
            
            
            this.willFocusSubscription = this.props.navigation.addListener(
                'willFocus',
                () => {
                    this.getToken("clicked");
                    this.getToken("name");

                    this.setState({
                        date:new Date().getDate() +"/"+new Date().getMonth() + "/" + new Date().getFullYear(),
                        day:null
                    })
            this.setState({
                option:"op1",
                data:[0,0,0,0,0],
            })
        }
        );
        
    }
    state={
        data:[0,0,0,0,0],
        q:1,
        User_id:null,
        option:"op1",
        isLoadig:false,
        name:null,
        date:null,
        day:null
    }

    async getToken(key) {
        try {
          let userData = await AsyncStorage.getItem(key);
          let data = JSON.parse(userData);

          if(key=="clicked"){
          this.setState({
              User_id:data
          })}
          
        else if(key=="name"){
            this.setState({
                name:data
            })
        }
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
   pushData = (data) =>{
       this.state.data.push(data);
       console.log(this.state.data);
      
   }
   submit = (data) =>{
       this.setState({
        q:this.state.q + 1
       })
      this.pushData(data)
       this.qustions;
    
   

   }
   image = () => {
    console.log(this.state.data.length);
    if(this.state.q== "1"){
    return(
        <Image source={require('../assets/Src/icons/feedback/1.png')}
        style={{height:400,width:200}}
        />
    )
    }
    else if(this.state.q== "2"){
        return(
        <Image source={require('../assets/Src/icons/feedback/2.png')}
        style={{height:400,width:200}}
        />
        )
    }
    else if(this.state.q== "3"){
        return(
        <Image source={require('../assets/Src/icons/feedback/3.png')}
        style={{height:400,width:200}}
        />
        )
    }
    else if(this.state.q== "4"){
        return(
        <Image source={require('../assets/Src/icons/feedback/4.png')}
        style={{height:400,width:200}}
        />
        )
    }
}
   
changeCheckState = (data)=>{
let temp=this.state.data;
temp[data] == 1 ? temp[data]=0:temp[data]=1


this.setState({
   data:temp
})
console.log(this.state.data)
}
submit = () =>{
//this.state.User_id
this.setState({isLoadig:true})
fetch(url+`status/${this.state.User_id}?fever=${this.state.data[0]}&suffocation=${this.state.data[1]}&cough=${this.state.data[2]}&cold=${this.state.data[3]}&throat=${this.state.data[4]}`).catch((err =>{
    console.log("error")
}))
  .then((response) => response.json()).catch(err =>{
    console.log("Error Json")
  })
  .then((responseJson) => {
   if(responseJson=="success"){
        this.props.navigation.navigate("Home")
            this.setState({isLoadig:false})
            Alert.alert("Data Updated","നിങ്ങളുടെ ആരോഗ്യ നില രേഖപ്പെടുത്തിയിരിക്കുന്നു. ഉത്തരവാദിത്തമുള്ള ഒരു പൗരനായിരുന്നതിന് നന്ദി .")}
    else{
        Alert.alert("Error");
        this.setState({isLoadig:false})
        }

        this.props.navigation.navigate("Home")
    
  })
  .catch((error) =>{
    console.error(error);
    this.setState({isLoadig:false})
  });
}
printCheck = () =>{

    return(
    <Block flex={0} center middle >
    <Check icon={this.state.data[0]==1 ? "check":null} name="പനി" onPress={()=>this.changeCheckState(0)} />
    <Check icon={this.state.data[1]==1 ? "check":null} name="ശ്വാസ തടസം" onPress={()=>this.changeCheckState(1)} />
    <Check icon={this.state.data[2]==1 ? "check":null} name="ചുമ" onPress={()=>this.changeCheckState(2)} />
    <Check icon={this.state.data[3]==1 ? "check":null} name="ജലദോഷം" onPress={()=>this.changeCheckState(3)} />
    <Check icon={this.state.data[4]==1 ? "check":null} name="തൊണ്ടവേദന" onPress={()=>this.changeCheckState(4)} />
    </Block>
    );
}
choice = ()=>{
    if(this.state.option=="op2")
    return(
    <Block>
    <Block middle center style={{marginTop:30,marginBottom:0}}>
                   <Text h31>ഇവയിൽ ഏതെല്ലാം ?</Text>
                  
    </Block>
    {this.printCheck()}
    <Button style={{marginTop:15,flexDirection:'row'}} color="blue" onPress={this.submit}>
    <Text button color="white">
            Save
    </Text>
    </Button>
    </Block>
)
    else{
        return(
            
            <Block center middle>
            <Block center style={{marginTop:30,marginBottom:0}} middle center>
                           <Text center h31>താഴെ പറയുന്ന ഏതെങ്കിലും </Text>
                           <Text center h31>രോഗലക്ഷണങ്ങൾ </Text>
                           <Block>
                           <Text center bold h31 color="red" >പനി,ശ്വാസ തടസം,ചുമ</Text>
                           
                           <Text center bold h31 color="red" >ജലദോഷം,തൊണ്ടവേദന</Text>
                           </Block>

                           <Text center h31>ഉണ്ടോ ? </Text>
            </Block>
           
            <Button style={{marginTop:15,flexDirection:'row'}} color="blue" onPress={()=>this.setState({option:"op2"})}>
            <Text h31  color="white">
                ഉണ്ട്
            </Text>
            </Button>
            <Check name="ഇല്ല" onPress={this.submit} />
            </Block>
        )
    }
}

    render() {
        console.log("uerid:"+this.state.User_id)
        const {navigation} = this.props;
        
        const toggleDrawer = () => {
            navigation.openDrawer();
          }
          if(this.state.isLoadig==true)
          {
         
              return <Loader />
          }else{

        return (
            <Block>
            <Block center middle style={{backgroundColor:'white'}}>
                 <StatusBar barStyle = "light-content"  backgroundColor = {theme.colors.status_bar} />
                <Head Option={toggleDrawer} name={this.state.name}/>

                <ScrollView>
                <Block middle center style={{marginTop:30,marginBottom:30}}>
                <Image source={require('../assets/Src/img/logo.png')}
                style={{ height: 130, width:130 }}
                />
                </Block>
                <Text center bold>Date: {this.state.date}</Text>
                 {this.choice()}
               
                </ScrollView>
                </Block>
                {/* <FloatB onPress={()=>call({number: '04832733256', prompt: false}).catch(console.error)} style={{bottom:25,alignSelf:"flex-end"}}/> */}
            </Block>   
           
        );
          }
    }
}
export default Track;

const styles = StyleSheet.create({
  
});