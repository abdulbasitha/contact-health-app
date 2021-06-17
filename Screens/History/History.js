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
import Histroy from '../../components/History';
import Block from '../../components/Block';
import Text from '../../components/Text';
import InputArea from '../../components/InputArea';
import Button from '../../components/Button';
import Check from '../../components/checkbox';
import Button_Op from '../../components/Button_Yes_No';
import Head from '../../components/header';
import * as Operation from '../../contants/operation';
import firebase, { auth } from "firebase";
import config from '../../config/firebase';
import FloatB from '../../components/Floating_Button';
import * as theme from '../../contants/theme';
import { ScrollView } from "react-native-gesture-handler";
import * as json from '../../contants/json';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../../components/Spinner';
const url = json.url;
const ans = []
class Track extends Component {
    componentDidMount(){
            
            
            this.willFocusSubscription = this.props.navigation.addListener(
                'willFocus',
                () => {
                   
                    this.getToken("clicked");
                    this.getToken("name");
                    this.getToken("st_no");
                    this.getToken("st_date");
                    
                    this.setState({
                        date:new Date().getDate() +"/"+new Date().getMonth() + "/" + new Date().getFullYear(),
                        day:null,
                        isLoadig:true,
                        Response_Json:null,
                        no_days:null
                    })
            this.setState({
                option:"op1",
                data:[0,0,0,0,0],
            })
        }
        );
        
    }

    constructor(){
            
            super()
     
             
              this.getToken("clicked");
              this.getToken("name");
              this.getToken("st_no");
              this.getToken("st_date");
              
              
              this.setState({
                  date:new Date().getDate() +"/"+new Date().getMonth() + "/" + new Date().getFullYear(),
                  day:null,
                  isLoadig:true,
                  Response_Json:null,
              })
     
  
  
  
}
    state={
        data:[0,0,0,0,0],
        q:1,
        User_id:null,
        option:"op1",
        isLoadig:true,
        Response_Json:null,
        name:null,
        date:null,
        day:null,
        history:null,
        st_date:null
    }

    async getToken(key) {
        try {
          let userData = await AsyncStorage.getItem(key);
          let data = JSON.parse(userData);
          
          if(key=="clicked"){
          this.setState({
              User_id:data
          })
          this.fetch_history();
            }
          
          else if(key=="name"){
            this.setState({
                name:data
            })
          }
          else if(key=="st_no"){
            this.setState({
                no_days:data
            })
          }
            else if(key=="st_date"){
             this.cal_days(data)
            }
            

        
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
  
   fetch_history = ()=>{
       this.setState({
           isLoadig:true
       })
      console.log(url+`history/${this.state.User_id}`)
    fetch(url+`history/${this.state.User_id}`).catch((err =>{
        console.log("error")
        console.log(url+`history/${this.state.User_id}`)
    }))
      .then((response) => response.json()).catch(err =>{
        console.log(url+`history/${this.state.User_id}`)
      })
      .then((responseJson) => {
        this.setState({isLoadig:false})
          try{
           
            
              this.setState({Response_Json:responseJson})

              console.log(responseJson)

            console.log(url+`history/${this.state.User_id}`)
            
          }catch(e){
            Alert.alert("Error","Please Check Your Internet Connection")
          }
        
      })
      .catch((error) =>{
        console.error(error);
      });


   }
cal_days=(data)=>{
  var msDiff = new Date(data).getTime() - new Date().getTime();    //Future date - current date
  var days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  days = Number(days) + Number(this.state.no_days) +1
  console.log("sdsdsdsdsdsdsdsd",days);
  this.setState({
    st_date: days<=0 ? "അവസാനിച്ചു ഉത്തരവാദിത്തമുള്ള ഒരു പൗരനായിരുന്നതിന് നന്ദി .":(days+ " - ദിവസത്തിനുള്ളിൽ അവസാനിക്കും" )
  })
}
  
   





    render() {
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

                <ScrollView scrollToOverflowEnabled={false}>
                <Block middle center style={{marginTop:30,marginBottom:30}}>
                <Image source={require('../../assets/Src/img/logo.png')}
                style={{ height: 130, width:130 }}
                />
                </Block>
                    <Block margin={20} center>
                      <Text center bold h4 color={theme.colors.black2}>നിങ്ങളുടെ ക്വാറന്റൈനിന്റെ കാലാവധി </Text>
                    <Text center bold h4 color={theme.colors.black2}> {this.state.st_date}</Text>
                    </Block>
                    <Histroy header_name="Activity History" data={this.state.Response_Json} />
                
               
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