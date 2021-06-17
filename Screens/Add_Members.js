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
    AsyncStorage,
    StatusBar,
    BackHandler

} from "react-native";
import FloatB from '../components/Floating_Button';
import Block from '../components/Block';
import Head from '../components/header';
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
    constructor(props){
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
       // this.props.navigation.goBack(null);
       this.setState({
        active:"OKD_ID",
        isLoadig:false,
        odk_id:"",
        otp:"",
        Response_Json:"",
        userJson:""
    })
        
    }
    state={
        active:"OKD_ID",
        isLoadig:false,
        odk_id:"",
        otp:"",
        Response_Json:"",
        userJson:""
        
    }
    componentDidMount(){
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
              this.getToken();
            }
          );

        this.getToken("userData");
    }

    async getToken(user) {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = userData;
          this.setState({
              userJson:data
          })
          console.log(data);
         
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }

        verify = ()=>{
        if(this.state.active=="OKD_ID"){
        if(this.form_validate()==1){
            this.setState({isLoadig:true})
            fetch(url+`${this.state.odk_id}/login`).catch((err =>{
                console.log("error")
            }))
              .then((response) => response.json()).catch(err =>{
                console.log("Error Json")
              })
              .then((responseJson) => {
                this.setState({isLoadig:false})
                  try{
                      this.setState({Response_Json:responseJson})
                    if(responseJson[0].odk_id == this.state.odk_id){
                        this.setState({
                            active:"OTP"
                        })
                      
                    }else{
                        Alert.alert("Invalid OKD ID")
                    }
                  }catch(e){
                    Alert.alert("Error","Please Check Your Internet Connection")
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

                
                fetch(url+"add_members/"+`${this.state.odk_id}`+"/"+parseInt(this.state.userJson)).catch((err =>{
                    console.log("error")
                }))
                  .then((response) => response.json()).catch(err =>{
                    console.log("Error Json :"+url+"add_members/"+`${this.state.odk_id}`+"/"+parseInt(this.state.userJson))
                  })
                  .then((responseJson) => {
                    this.setState({isLoadig:false})
                      try{
                          if(responseJson[0]=="ok"){
                            Alert.alert("Success","അംഗങ്ങളെ ചേർത്തിരിക്കുന്നു")
                            this.props.navigation.navigation("Home")
                            
                          }else{
                            Alert.alert("Error Occurred!!")
                            this.setState({
                                active:"OKD_ID",
                                isLoadig:false,
                                odk_id:"",
                                otp:"",
                                Response_Json:"",
                                userJson:""
                            })
                            this.props.navigation.navigate("Home")
                          }
                        
                      }catch(e){
                       // Alert.alert(url+"add_members/"+`${this.state.odk_id}`+"/"+parseInt(this.state.userJson))
                        this.props.navigation.navigate("Home")
                      }
                    
                  })
                  .catch((error) =>{
                    console.error(error);
                  });


            // this.props.navigation.navigate("Home")
            // this.setState({
            //     active:"OKD_ID",
            //     odk_id:"",
            //     otp:"",
            //     Response_Json:""
            // })
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
                    
                    Continue With OKD ID
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
        
        
        const toggleDrawer = () => {
            navigation.openDrawer();
          }

        const {navigation} = this.props;
        
        if(this.state.isLoadig==true)
        {
       
            return <Loader />
        }else{
        
        return (
           <Block>

        <Block center middle  >
            <StatusBar barStyle = "light-content"  backgroundColor = {theme.colors.status_bar} />
            <Head Option={toggleDrawer} name="Home" />
            <KeyboardAvoidingView style={{flex:1}}  behavior="height" enabled>
            <Block center middle>
            <Block middle style={{marginTop:30,marginBottom:30}}>
                <Image source={require('../assets/Src/img/logo.png')}
            style={{ height: 130, width:130 }}
        />
    </Block>
                    <Block center flex={2.3}>
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
                    paragraph center
                    color="black3"
                    bold
                    // size={15} 
                    // color="#8798ad" 
                    // spacing={0} 
                    // height={22} 
                    // weight={'normal'} 
                    >രജിസ്റ്റർ ചെയ്ത മൊബൈൽ നമ്പറിലേക്ക് വന്നിട്ടുള്ള ഒ.ഡി.കെ,ഒ.ടി.പി ഐഡി രേഖപ്പെടുത്തുക</Text>
                
             
                {this.view_op()}
                
                
                

                </Block>
          </Block>
          </KeyboardAvoidingView>
          </Block>
                <FloatB onPress={()=>call({number: '04832733256', prompt: false}).catch(console.error)} style={{bottom:25,alignSelf:"flex-end"}}/>
          </Block>
        );
        }
    }
}
export default Menu;

const styles = StyleSheet.create({
    container: {
      
    }
});