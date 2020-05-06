import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from "./courseItemStyle";
import fonts from "../sharedStyles/fontStyle";
import { connect } from "react-redux";

class CourseItem extends Component{
  render(){
    const{URL, title, index, intlData, quizButton} = this.props;
    return(
      <View style={styles.courseWrap}>
        <View style={styles.courseTitleWrap}>
          <Text style={[styles.courseDetailTxt, fonts.montserrat_semibold]}>{title}</Text>
          <TouchableOpacity style={styles.quizBtn} onPress={()=>this.props.onQuiz(index)}>
            <Text style={[styles.quizTxt, fonts.montserrat_semibold]}>{intlData.messages['videos']['quiz&study']}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subscribeWrap}>
          <Image 
            style={styles.playThumbnailImg}
            resizeMode="cover"
            source={index===0?require("../../assets/image/course_1.jpeg"):require("../../assets/image/course_2.jpeg")}
          />
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

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})
export default connect(mapStateToProps, null)(CourseItem);