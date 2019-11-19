import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';

import styles from "./homeScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

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
    this.props.navigation.navigate("about");
  }

  onTutorial =()=>{
    this.props.navigation.navigate("tutorial");
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
        <TouchableOpacity style={styles.aboutbtnWrap} onPress={this.onTutorial}>
          <Text style={[styles.aboutTxt, fonts.montserrat_bold]}>Tutorial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutbtnWrap} onPress={this.onAbout}>
          <Text style={[styles.aboutTxt, fonts.montserrat_bold]}>About CHAP</Text>
        </TouchableOpacity>
        <View style={styles.helpWrap}>
          <Text style={styles.moreTxt}>{"For more Information, Please visit "}</Text>
          <TouchableOpacity onPress={()=>{Linking.openURL("https://www.agemyhorse.com");}}>
            <Text style={styles.webTxt}>www.agemyhorse.com</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default homeScreen;
