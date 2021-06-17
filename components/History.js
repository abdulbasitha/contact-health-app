/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Text from './Text';
import * as theme from '../contants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from './Spinner';
import Block from "./Block";
import { ScrollView } from "react-native-gesture-handler";
const {width} = Dimensions.get("window");
class Button extends Component {
    state = {
        count:null,
   
    }
    componentDidMount(){
      
     console.log("sdsdsdsdsdssd",this.props.data)
     
    }
    render_data = () =>{
        
        try{
            let dataSet = []
         
            this.props.data.map(data =>{
              if(dataSet.includes(data.created_at.split(' ').slice(0, -1).join(' '))!=true){
                dataSet.push(data.created_at.split(' ').slice(0, -1).join(' '))
              }}
          )

           
            this.setState({
                count:dataSet.length
            })
        }catch(e){
    
        }
        
        try{
         let dataSet = []
         
      this.props.data.map(data =>{
        newd = (data.created_at.split(' ').slice(0, -1).join(' '));
        
        newdate = newd.split('-').reverse().join('-')
        
        if(dataSet.includes(newdate)!=true){
          dataSet.push(newdate)
        }}
    )
    let i = 0;
    console.log(dataSet)
    return dataSet.map(data =>{
         console.log("datasdsd",data)
        //   console.log((data.created_at.split(' ').slice(0, -1).join(' ')))
        
        return (
           
        <Block key={data} flexDirection="row" justifyContent="space-between" margin={20}>
        <Text h5>{data}</Text>
        <Text h5 color="green">Updated</Text>
        </Block>
       
        
         )
        
      }
      )
    }catch(e){
        
    }
    }

    render() {
        const {style,full,opacity,color,...props} =this.props;
        const ButtonStyle = [
               styles.button,
               styles.full,
               color && color === 'white' && styles.white,
               
                style,
                
                
                

        ] ;
       
        
       
        return (
            <Block
            style={ButtonStyle}{...props}
            activeOpacity={opacity||.8}
            
            >   
              <ScrollView>
           
                <Block flexDirection="row" justifyContent="space-between" margin={20}>
                <Text bold>{props.header_name}</Text>
                <Text bold>{this.state.count} Entry found</Text>
               </Block>
             
                {this.render_data()}
                </ScrollView>
        </Block>
           
        );
        }
    
}

export default Button;




const styles = StyleSheet.create({
   button:{
    backgroundColor:theme.colors.white,
    borderRadius:4,
    // marginLeft:10,
    // marginRight:10,
    marginBottom:50,
    
    fontSize:15,

    borderWidth:1,
    borderColor:theme.colors.blue
   },
   full:{
       width:(width-50)
   },
   white: { backgroundColor: theme.colors.white, },
});

// width: 325px;
// height: 50px;
// background: transparent;
