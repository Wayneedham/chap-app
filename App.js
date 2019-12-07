import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import SplashScreen from 'react-native-splash-screen';

const store = configureStore()
const RouterWithRedux = connect()(Router);

import landingScreen from './src/screens/landing/landingScreen';
import loginScreen from './src/screens/auth/login/loginScreen';
import videoPlayScreen from './src/screens/video/videoPlayScreen';
import quizVideoScreen from './src/screens/quiz/quizVideoScreen';
import quizTextScreen from './src/screens/quiz/quizTextScreen';
import detectResultScreen from './src/screens/tabs/detect/detectResultScreen';
import signupScreen from './src/screens/auth/signup/signupScreen';
import customTabNavigator from "./src/screens/tabs/tabNavigator";

// var notification_num = 3;
export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" >
            <Scene
              key="landingScreen"
              component={landingScreen}
              title="landingScreen"
              initial={true}
              hideNavBar={true}
            />

            <Scene
              key="loginScreen"
              component={loginScreen}
              title="loginScreen"
              initial={false}
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
              key="detectResultScreen"
              component={detectResultScreen}
              title="detectResultScreen"
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

            <Scene
              key="videoPlayScreen"
              component={videoPlayScreen}
              title="videoPlayScreen"
              initial={false}
              hideNavBar={true}
            />

            <Scene
              key="quizVideoScreen"
              component={quizVideoScreen}
              title="quizVideoScreen"
              initial={false}
              hideNavBar={true}
            />

            <Scene
              key="quizTextScreen"
              component={quizTextScreen}
              title="quizTextScreen"
              initial={false}
              hideNavBar={true}
            />
          </Scene>          
        </RouterWithRedux>
      </Provider>
    );
  }
}
    
