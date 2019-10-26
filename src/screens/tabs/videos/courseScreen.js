import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import CourseItem from "../../pagecomponents/courseComponent";
import styles from "./courseScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class courseScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>Course</Text>        
        </View>
        <View style={styles.course_container}>
          <CourseItem />
        </View>
      </View>
    )
  }
}

export default courseScreen;