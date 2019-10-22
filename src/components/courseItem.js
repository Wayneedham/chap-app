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

import styles from "./courseItemStyle";
import fonts from "../sharedStyles/fontStyle";

class CourseItem extends Component{
  render(){
    const{courseTitleText, courseDetailText} = this.props;
    return(
      <View style={styles.courseWrap}>
        <Text style={[styles.courseTitleTxt, fonts.montserrat_semibold]}>{courseTitleText}</Text>
        <Text style={styles.courseDetailTxt}>{courseDetailText}</Text>
        <View style={styles.subscribeWrap}>
          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default CourseItem;