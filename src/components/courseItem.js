import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from "./courseItemStyle";
import fonts from "../sharedStyles/fontStyle";

class CourseItem extends Component{
  render(){
    const{URL, title} = this.props;
    return(
      <View style={styles.courseWrap}>       
        <Text style={[styles.courseDetailTxt, fonts.montserrat_semibold]}>{title}</Text>
        <View style={styles.subscribeWrap}>          
          <TouchableOpacity onPress={()=>this.props.onVideoPlay(URL)}>
            <Image 
              style={styles.videoPlayImg}
              resizeMode="contain"
              source={require("../../assets/icons/icon_videoplay.png")}
            />
          </TouchableOpacity>     
        </View>
      </View>
    )
  }
}

export default CourseItem;