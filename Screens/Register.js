/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import Block from '../components/Block';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import * as theme from '../contants/theme';
import firebase, { auth } from "firebase";
import config from '../config/firebase';
import { 
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    TouchableWithoutFeedback
   
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { timing } from "react-native-reanimated";
const {height} = Dimensions.get('window');

class Login extends Component {
   state = {
       name:"",
       email:"",
       password:"",
       opcode:"",
       active:"administrator",
   }
   handleType = id =>{
    const {active} = this.state;
    this.setState({
        active: active === id ? null:id,
    })
    console.log(this.state.operator)
}
   

Register = () => {
      
       if(this.state.name == "" || this.state.email == "" || this.state.password == "" ||this.state.active == null){
                Alert.alert("All fields are required")
                return;
                }
            try{
                firebase
                .auth()
                .createUserWithEmailAndPassword
                (this.state.email,this.state.password)
                
                .then(() => {
                    
                    
                  Alert.alert("ok")

                }).catch((error) => Alert.alert(error.toString(error)));

                firebase.auth().onAuthStateChanged((user)=>{
                    console.log(user.uid)
                    firebase.database().ref('users/'+user.uid).set({
                        email:this.state.email,
                        name:this.state.name,
                        type:this.state.opcode == "" ?  "user" : "operator" 
                    }).then(()=>{
                        // this.props.navigation.navigate('Login')
                    })
                })
            }
            
            
            catch (error) {
                console.log(error.toString(error));
              }
        

       // this.props.navigation.navigate('Track')
   }
    render() {
        const {active} = this.state;
        const {navigation} = this.props;
        const adminIcon = (
            <Image source={require('../assets/Src/icons/energy.png')}
            style={{ height: 19, width: 15 }}
        />
        );
        const Operator = (
            <Image source={require('../assets/Src/icons/operator.png')}
            style={{ height: 19, width:19 }}
        />
        );

        const checked = (
            <Image source={require('../assets/Src/icons/Checked.png')}
            style={{ height: 10, width:10 }}
        />
        );
        // const {navigation} = this.props;
        return (
           




<KeyboardAwareScrollView  >

<Block center middle style={{ marginTop:80,marginBottom: 40}}>
    <Block middle style={{marginBottom:40}}>
        <Image source={require('../assets/Src/img/logo.png')}
            style={{ height: 70, width: 70 }}
        />
    </Block>
    <Block  center  >


        <Text h3
            style={{ marginBottom: 5 }}
        >
            Sign up to Zia Tracker</Text>

        <Text
            paragraph
            color="black3"

        >Please enter your credentials to proceed.</Text>

        <Block row space="between" style={{ marginHorizontal: 28, marginTop: 40 ,marginBottom:28}}>

            <TouchableWithoutFeedback onPress={() => this.handleType('administrator')}>
                <Block
                    center
                    middle

                    style={[{ marginRight:10 }, styles.card, active === 'administrator' ? styles.active : null]}

                >
                     {active === 'administrator' ?
                    ( <Block center middle style={styles.check}>
                        {checked}
                        </Block>) :null
                    }
                    <Block center middle style={styles.icon}>
                    {adminIcon}
                    </Block>
                    <Text h4 weight="bold">User</Text>
                    <Text paragraph color="black3" center style={{ marginTop: 9 }}></Text>
                </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.handleType('oprator')}>
                <Block
                    center
                    middle
                    style={[{marginLeft:10},styles.card, active === 'oprator' ? styles.active : null]}

                >
                    {active === 'oprator' ?
                    ( <Block center middle style={styles.check}>
                        {checked}
                        </Block>) :null
                    }
                   

                    <Block center middle style={styles.icon}>
                    {Operator}
                    </Block>

                    
                    <Text h4 weight="bold">Operator</Text>
                    <Text paragraph color="black3" center style={{ marginTop: 9 }}></Text>
                </Block>

            </TouchableWithoutFeedback>
        </Block>
        
        <Block center >
            <Input label={"Full Name"}
             onChangeText={(name)=>this.setState({name})}
             style={{ marginBottom: 15 }}
              full />
            <Input label={"Email"} 
            onChangeText={(email)=>this.setState({email})}
            style={{ marginBottom: 15 }} 
            full />
            <Input label={"password"} rightlabel={

                <Text onPress={() => navigation.navigate('Forgot')} paragraph color="gray">Forgot password?</Text>

            }
            onChangeText={(password)=>this.setState({password})}
                style={{ marginBottom: 25 }} password full />

            {active === "oprator"? (<Input label={"operator security code"}
             onChangeText={(opcode)=>this.setState({opcode})} number
             style={{ marginBottom: 15 }}
              full />) :null}
            

            <Button style={{ marginBottom: 12 }} onPress={this.Register}>
                <Text button >Create Account</Text>
            </Button>
            <Text paragraph color="gray" >
                Already have an account? <Text color="blue" height={18} onPress={() => navigation.navigate('Login')}>
                    Sign in</Text>
            </Text>

        </Block>
    </Block>
</Block>

</KeyboardAwareScrollView>
        
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    
    card:{
        padding:10,
        borderWidth:1,
        borderColor:theme.colors.border,
        height:175,
        borderRadius:5,

    },
    active:{
        borderWidth:1,
        borderColor:theme.colors.blue,
     
       
        shadowColor:theme.colors.blue,
       
    },
    icon:{
        flex:0,
        width:60,
        height:60,
        borderRadius:50,
        marginBottom:12,
        backgroundColor:theme.colors.lightblue

    },
    check:{
        backgroundColor:theme.colors.blue,
        position:'absolute',
        right:-4,
        top:-4,
        width:18,
        height:18,
        borderRadius:50,
        
    }


}


);

