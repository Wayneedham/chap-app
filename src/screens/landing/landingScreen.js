import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { Actions } from "react-native-router-flux";
import * as userActions from "../../actions/userActions";
import styles from "./landingScreenStyle";

class landingScreen extends Component{

  componentDidMount(){
    setTimeout(()=>{
      userActions._retrieveData("logged").then(value => {
        if(value=="true"){
          userActions._retrieveData('userInfo').then((data) => {
            const userInfo = JSON.parse(data);
            window.currentUser = userInfo;
            Actions.reset("customTabNavigator");
          })
        }else{
          Actions.reset("loginScreen");
        }
      })
    }, 2000)
  }

  render(){
    return(
      <View style={styles.container}>
        <Image 
          style={styles.landing}
          source={require("../../../assets/image/bg_splash.png")}
          resizeMode="contain"
        />
      </View>
    )
  }
}

export default landingScreen;