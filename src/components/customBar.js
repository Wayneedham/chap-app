import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from "./customBarStyle";
class customBar extends Component{

  goBack = () => {
    this.props.navigate.goBack();
  }

  render(){
    const {title} = this.props;
    return(
      <View style={styles.topbar_wrap}>
        <Text style={[styles.title, fonts.montserrat_bold]}>{title}</Text>
        <TouchableOpacity style={styles.back_wrap} onPress={this.goBack}>
          <Image
            source={require("../../assets/icons/icon_back_white.png")}
            style={styles.back}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default customBar;