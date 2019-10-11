import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';

import styles from "./homeScreenStyle";

const test_data = {
  image: "http://agehorseservice.eastus.cloudapp.azure.com:8000/media/IMG_0007.JPG",
  desc: "test desc",
  type: "lower",
  age: "12.92333355"
}

class homeScreen extends Component{
  render(){
    return(
      <View style={styles.container}>

      </View>
    )
  }
}

export default homeScreen;