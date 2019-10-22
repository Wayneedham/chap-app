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


import CourseItem from "../../../components/courseItem";
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
          <CourseItem 
            courseTitleText={"Course 1"}
            courseDetailText={"This is test description for course 1"}
          />
          <CourseItem 
            courseTitleText={"Course 2"}
            courseDetailText={"This is test description for course 2"}
          />
        </View>
      </View>
    )
  }
}

export default courseScreen;