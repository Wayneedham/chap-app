import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View ,
         Image, NativeModules, AppState} from 'react-native';
import { Router, Scene, ActionConst, Actions , Tabs ,  } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import SplashScreen from 'react-native-splash-screen';

const store = configureStore()
const RouterWithRedux = connect()(Router);

import loginScreen from './src/screens/auth/login/loginScreen';
import signupScreen from './src/screens/auth/signup/signupScreen';
import customTabNavigator from "./src/screens/tabs/tabNavigator";

// var notification_num = 3;
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" >
            <Scene
              key="loginScreen"
              component={loginScreen}
              title="loginScreen"
              initial={true}
              hideNavBar={true}
            />

            <Scene
              key="signupScreen"
              component={signupScreen}
              title="signupScreen"
              initial={false}
              hideNavBar={true}
            />
            <Scene
              key="customTabNavigator"
              component={customTabNavigator}
              title="customTabNavigator"
              initial={false}
              hideNavBar={true}
            />
          </Scene>          
        </RouterWithRedux>
      </Provider>
    );
  }
}
    
