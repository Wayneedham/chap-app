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
    const{courseTitleText, courseDetailText, isSubscribe, URL} = this.props;
    return(
      <View style={styles.courseWrap}>
        <Text style={[styles.courseTitleTxt, fonts.montserrat_semibold]}>{courseTitleText}</Text>
        <Text style={styles.courseDetailTxt}>{courseDetailText}</Text>
        <View style={styles.subscribeWrap}>
          {
            isSubscribe ? (
              <TouchableOpacity onPress={()=>this.props.onVideoPlay(URL)}>
                <Image 
                  style={styles.videoPlayImg}
                  resizeMode="contain"
                  source={require("../../assets/icons/icon_videoplay.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.props.onSubScribe()}>
                <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Subscribe Now</Text>
              </TouchableOpacity>
            )
          }          
        </View>
      </View>
    )
  }
}

export default CourseItem;