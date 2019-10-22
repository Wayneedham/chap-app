import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal
} from 'react-native';

import styles from "./homeScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import serverurl from '../../../../config/const/serverurl';

class homeScreen extends Component{
  constructor(props) {
    super(props);
  }

  onDetect =()=>{
    this.props.navigation.navigate("create");
  }

  onCourse=()=>{
    this.props.navigation.navigate("video");
  }

  onAbout =()=>{

  }

  render(){  
    return(
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <Text style={[styles.bigTxt, fonts.montserrat_bold]}>Welcome</Text>
          <Text style={[styles.bigTxt, fonts.montserrat_bold]}>To</Text>
          <Image 
            style={styles.logo_img}
            source={require("../../../../assets/logo/small_logo.png")}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.buttonWrap} onPress={this.onDetect}>
          <Text style={[styles.buttonText, fonts.montserrat_bold]}>Age Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrap} onPress={this.onCourse}>
          <Text style={[styles.buttonText, fonts.montserrat_bold]}>Video Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrap} onPress={this.onAbout}>
          <Text style={[styles.buttonText, fonts.montserrat_bold]}>About CHAP</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default homeScreen;
