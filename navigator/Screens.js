import React, { Component } from "react";
import {createAppContainer, ScrollView} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home_Menu from '../Screens/Home_Menu';
import Icon from 'react-native-vector-icons/Fontisto';
import Text from '../components/Text';
import * as theme from '../contants/theme';
import Block from '../components/Block';
import Add_Members from '../Screens/Add_Members';
import Feed from '../Screens/FeedBack';
import Help_Desk from '../Screens/HelpDesk';
import Logout from '../Screens/Logout';
import History from '../Screens/History/History_Members';
import Members_List from '../Screens/Members_List';
import History_View from '../Screens/History/History';
import SideBar from '../components/SideBar';
import { Dimensions } from "react-native";
const ScreenContainer =  createDrawerNavigator ({
    Home:{screen:Home_Menu,navigationOptions:{
        title:"Home",
        drawerIcon:({tintColor}) => (<Text><Icon name="home" size={20} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>)
    }},
    Add:{screen:Add_Members,navigationOptions:{
        title:"Add members",
        drawerIcon:({tintColor}) => (<Text><Icon name="plus-a" size={20} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>)
    }},

    Update:{screen:Feed,navigationOptions: {
        drawerLabel: () => null
    }},
    Members :{screen:Members_List,navigationOptions: {
        drawerLabel: () => null
    }},
    History :{screen:History,navigationOptions:{
        title:"Activity history",
        drawerIcon:({tintColor}) => (<Text><Icon name="history" size={20} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>)
    }},
    History_View:{screen:History_View,navigationOptions: {
        drawerLabel: () => null
    }},
    Help :{screen:Help_Desk,navigationOptions:{
        title:"Help desk",
        drawerIcon:({tintColor}) => (<Text><Icon name="phone" size={20} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>)
    }},
    Logout : {screen:Logout,navigationOptions:{
        title:"Sign out",
        drawerIcon:({tintColor}) => (<Text><Icon name="arrow-left" size={20} style={{marginBottom:10}} color={theme.colors.lightblue} /></Text>)
    }}
 


},{
    contentComponent: props => <SideBar {...props} />,
    contentOptions:{
        activeBackgroundColor:theme.colors.side_bar,
        activeTintColor:theme.colors.lightblue,
        itemsContainerStyle:{
            marginTop:16,
            marginHorizontal:8
        },
        itemStyle:{
            borderRadius:4
        }
    }
}

);
export default createAppContainer(ScreenContainer);

