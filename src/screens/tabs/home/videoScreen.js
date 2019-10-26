import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import CourseItem from "../../pagecomponents/courseComponent";
import CustomBar from "../../../components/customBar";
import styles from "./videoScreenStyle";

class courseScreen extends Component{

  render(){  
    return(
      <View style={styles.container}>
        <CustomBar 
          title={"Course"}
          navigate={this.props.navigation}
        />
        <View style={styles.course_container}>
          <CourseItem />         
        </View>
      </View>
    )
  }
}

export default courseScreen