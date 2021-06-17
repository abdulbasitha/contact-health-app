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
    AsyncStorage
} from "react-native";
import FloatB from '../../components/Floating_Button';
import call from 'react-native-phone-call'
import Block from '../../components/Block';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/CardView';
import Button_Op from '../../components/Button_Yes_No';
import Head from '../../components/header';
import List from '../../components/ListView';
import * as Operation from '../../contants/operation';
import firebase, { auth } from "firebase";
import config from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView } from "react-native-gesture-handler";
import * as theme from '../../contants/theme';
import * as json from '../../contants/json';
import Loader from '../../components/Spinner';
const url = json.url;
class Track extends Component {
    async storeTokenL(user,key) {
        try {

           await AsyncStorage.setItem(key, JSON.stringify(user));
           console.log(JSON.stringify(user))
           } catch (error) {
          console.log("Something went wrong", error);
        }
      }
    async getToken(user) {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = JSON.parse(userData);
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
    constructor(props){
        super(props);
        this.state = {
            timePassed: false,
            logginIn:false,
            render_data:null,
            isLoadig:true
        };
    }
    state ={
        JsonData :null,
        UserId:null
    }
   componentDidMount(){
    // this.props.navigation.navigate.refresh();
    //this.run();
   // Alert.alert("Hi");
   this.willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    () => {
      this.getToken();
    }
  );
    this.getToken();
   }
run = ()=>{
    console.log(url+parseInt(this.state.UserId))
    fetch(url+parseInt(this.state.UserId)).catch((err =>{
        console.log("error")
        this.setState({
          isLoadig:false
        })
        this.props.navigation.navigate("Home")
    }))
      .then((response) => response.json()).catch(err =>{
        console.log("Error Json")
        this.setState({
          isLoadig:false
        })
        this.props.navigation.navigate("Home")
      })
      .then((responseJson) => {
        console.log(responseJson);
       this.setState({
           JsonData:responseJson
       })
     this.setState({
       isLoadig:false
     })
    })
      .catch((error) =>{
        console.error(error);
        this.setState({
          isLoadig:false
        })
        this.props.navigation.navigate("Home")
      });
}
store = (id,name,st_date,st_no) =>{
  this.storeTokenL(name,"name");
    this.storeTokenL(id,"clicked");
    this.storeTokenL(st_date,"st_date");
    this.storeTokenL(st_no,"st_no");
    this.props.navigation.navigate("History_View")
}
print_data = () =>{
        try{
            
           return this.state.JsonData.map(data=>{
                return (<List icon="user" key={data.odk_id} onPress={()=>this.store(data.odk_id,data.name,data.quarantine_staring_date,data.quarantine_period)} name={data.name} />);
                
            })
        }catch(e){
            console.log("error")
        }
        
        // return (<List icon="user" name="ABDUL BASITH" />);
   



    
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
            <Block center middle  >
                <StatusBar barStyle = "light-content"  backgroundColor = {theme.colors.status_bar} />
                <Head Option={toggleDrawer} name="എന്റെ പ്രവർത്തനങ്ങൾ" />
               
                
                <KeyboardAwareScrollView >
                <Block middle center style={{marginTop:30,marginBottom:30}}>
                <Image source={require('../../assets/Src/img/logo.png')}
                style={{ height: 130, width:130}}
                />
                 </Block>
                <Block style={{flexDirection:'row',
                justifyContent: 'space-around',
                alignSelf: 'auto',
                flexWrap: 'wrap',}} >
                    
                   {this.print_data()}
    
                    
                   
                </Block>  

             </KeyboardAwareScrollView>
              

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

{/* <StatusBar barStyle = "light-content"  backgroundColor = "#2549fa" />
<Head Option={toggleDrawer} name="Home"/>
<Block flex={4}  center middle>
<KeyboardAwareScrollView
   
>


</KeyboardAwareScrollView> */}





// fetch(url+`${this.state.UserId}`).catch((err =>{
//     console.log("error")
// }))
//   .then((response) => response.json()).catch(err =>{
//     console.log("Error Json")
//   })
//   .then((responseJson) => {
//     this.setState({isLoadig:false})
//       try{
//           this.setState({JsonData:responseJson})
//         console.log(responseJson);
        
//       }catch(e){
//         console.log(url+`${this.state.UserId}`);
//       }
    
//   })
//   .catch((error) =>{
//     console.error(error);
//   });