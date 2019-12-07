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
    const{URL, title, index} = this.props;
    return(
      <View style={styles.courseWrap}>       
        <View style={styles.courseTitleWrap}>
          <Text style={[styles.courseDetailTxt, fonts.montserrat_semibold]}>{title}</Text>  
          <TouchableOpacity style={styles.quizBtn} onPress={()=>this.props.onQuiz(index)}>
            <Text style={[styles.quizTxt, fonts.montserrat_semibold]}>{"Quiz & Study"}</Text>
          </TouchableOpacity>
        </View>        
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