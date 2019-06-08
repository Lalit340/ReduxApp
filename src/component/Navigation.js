import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginPage from '../pages/Login';
import Dash from '../pages/DashBoard';
import regPage from '../pages/Register';
import Forgot from '../pages/Forgot';
import Drawer from './NavigationDrawer';


const pages = createStackNavigator({
    Login: { screen: LoginPage },
    Dash: { screen: Dash, navigationOptions: { header: null } },
    Data: { screen: regPage, navigationOptions: { header: null } },
    Forgot: { screen: Forgot ,navigationOptions: { header: null } },
    Drawer: { screen: Drawer , navigationOptions: { header: null }},
},
    {
        initialRouteName: 'Login',

    });

const Container = createAppContainer(pages);
export default Container;