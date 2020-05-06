import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import CourseComponent from "../../pagecomponents/courseComponent";
import styles from "./courseScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import { connect } from 'react-redux';

class courseScreen extends Component{
  render(){
    const {intlData} = this.props
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>
            {intlData.messages['videos']['course']}
          </Text>
        </View>
        <View style={styles.course_container}>
          <CourseComponent />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})
export default connect(mapStateToProps, null)(courseScreen);