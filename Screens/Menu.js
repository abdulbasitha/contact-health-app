/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Alert,
    AsyncStorage
} from "react-native";
import Block from '../components/Block';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Spinner';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import * as theme from '../contants/theme';
import * as json from '../contants/json';
import Icon from 'react-native-vector-icons/FontAwesome';
const url = json.url;
class Menu extends Component {
    
    state={
        isLogin:false,
        active:"continue",
        isLoadig:false,
        odk_id:"",
        otp:"",
        Response_Json:""
        
    }
    async storeToken(type,user) {
        try {
            if(type=="odk_id"){
           await AsyncStorage.setItem("userData", user);
           console.log("ok");
            }
            else if(type=="name"){
                await AsyncStorage.setItem("userName", user);
                console.log("ok name");
            }
           
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      async getToken(user) {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = userData;
         
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }

        verify = ()=>{
        if(this.state.active=="OKD_ID"){
        if(this.form_validate()==1){
            this.setState({isLoadig:true})
            fetch(url+`${this.state.odk_id}/login`).catch((err =>{
                //Alert.alert("Error","Please Check Your Internet Connection")
                console.log("error")
            }))
              .then((response) => response.json()).catch(err =>{
                console.log("Error Json")
                console.log(url+`${this.state.odk_id}/login`)
              })
              .then((responseJson) => {
                this.setState({isLoadig:false})
                  try{
                      this.setState({Response_Json:responseJson})
                    if(responseJson[0].odk_id == this.state.odk_id){
                        this.setState({
                            active:"OTP"
                        })
                        console.log(url+`${this.state.odk_id}/login`)
                    }else{
                        Alert.alert("Invalid ODK ID")
                        console.log(url+`${this.state.odk_id}/login`)
                    }
                  }catch(e){
                    Alert.alert("Error","Please Check Your Internet Connection")
                    console.log(url+`${this.state.odk_id}/login`)
                  }
                
              })
              .catch((error) =>{
                console.error(error);
              });
            
        }
       
    }
    
    else if(this.state.active=="OTP"){
        if(this.form_validate()==1){
            if(this.state.otp==JSON.stringify(this.state.Response_Json[0].otp)){
                this.storeToken("odk_id",JSON.stringify(this.state.Response_Json[0].odk_id));   
                this.storeToken("name",JSON.stringify(this.state.Response_Json[0].name));   
            this.props.navigation.navigate("Home")
            console.log(AsyncStorage.getItem("userData"))
            
            this.setState({
                active:"OKD_ID",
                odk_id:"",
                otp:"",
                Response_Json:""
            })
            }
            else
                Alert.alert("Invalid OTP","Please Enter A Valid OTP")
         
        }

    
        

       
      
    }
}

      form_validate = ()=>{
       
        if(this.state.active == "OKD_ID"){
            if(this.state.odk_id==""){
            Alert.alert("Please Enter Your ODK ID");
            return;
            }
        }
        else if(this.state.active=="OTP"){
            if(this.state.otp==""){
            Alert.alert("Please Enter Your OTP");
            return;
            }

        }
        return 1;
        }
    
     
    
    


    
    view_op = () => {
        if(this.state.active ==="continue"){
            return((<Block style={{marginTop:40}} >
                <Button style={{marginBottom:10,flexDirection:'row'}} color="blue" onPress={()=>this.setState({active:"OKD_ID"})}>
                <Icon name="address-card" size={30} style={{marginRight:20}} color={theme.colors.white}/>
                    <Text button color="white">
                    
                    Connect With ODK ID
                    </Text>
                </Button>
                </Block>));  
        }
        else if(this.state.active ==="OKD_ID"){
            return((<Block style={{marginTop:40}} >
                 <Input label={"Enter Your ODK_ID"} number onChangeText={(odk_id)=>this.setState({odk_id})}
            value={this.state.odk_id}
             style={{ marginBottom: 15 }}
              full />
                <Button style={{marginBottom:10,flexDirection:'row'}} color="blue" onPress={this.verify}>
                    <Text button color="white">
                    
                    Verify ODK ID
                    </Text>
                </Button>
                </Block>));  
        }

        else if(this.state.active ==="OTP"){
            return((<Block style={{marginTop:40}} >

            <Input label={"Enter Your OTP"} number
            ref="1"
            clearButtonMode="always"
             onChangeText={(otp)=>this.setState({otp})}
             value={this.state.otp}
             style={{ marginBottom: 15 }}
              full />
                <Button style={{marginBottom:10,flexDirection:'row'}} color="blue" onPress={this.verify}>
                    <Text button color="white">
                    
                    Verify OTP
                    </Text>
                </Button>
                </Block>));  
        }

    }
    
        
        
   
    render() {

        const {navigation} = this.props;
        
        if(this.state.isLoadig==true)
        {
       
            return <Loader />
        }else{
        
        return (
           

           

            <KeyboardAvoidingView style={{flex:1}}  behavior="height" enabled>
            <Block center middle>
            <Block middle style={{marginTop:30,marginBottom:30}}>
                <Image source={require('../assets/Src/img/logo.png')}
            style={{ height: 130, width:130 }}
        />
    </Block>
                    <Block center flex={2.3}>
                    <Text bold
                    paragraph
                    color="black3"
                    style={{marginBottom:2}}
                    >Continue With</Text>
                    <Text h3
                    // size={28} 
                    // // color="#2e384d" 
                    // spacing={0} 
                    // height={32} 
                    // weight={'normal'}
                     style={{marginBottom:5}}
                    >
                     Contact Health</Text>
                    
                    <Text 
                    paragraph
                    color="black3"
                    // size={15} 
                    // color="#8798ad" 
                    // spacing={0} 
                    // height={22} 
                    // weight={'normal'} 
                    >Stay Healthy</Text>
                
             
                {this.view_op()}
                
                
                

                </Block>
          </Block>
          </KeyboardAvoidingView>
        );
        }
    }
}
export default Menu;

const styles = StyleSheet.create({
    container: {
      
    }
});