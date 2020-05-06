import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import CourseItem from "../../pagecomponents/courseComponent";
import CustomBar from "../../../components/customBar";
import styles from "./videoScreenStyle";
import { connect } from 'react-redux';

class courseScreen extends Component{

  render(){
    const {intlData} = this.props
    return(
      <View style={styles.container}>
        <CustomBar 
          title={intlData.messages['videos']['course']}
          navigate={this.props.navigation}
        />
        <View style={styles.course_container}>
          <CourseItem />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})
export default connect(mapStateToProps, null)(courseScreen);