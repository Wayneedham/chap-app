import React from "react";
import {
  Text,
  TouchableOpacity
} from "react-native";
import FastImage from 'react-native-fast-image';

import * as userActions from "../actions/userActions";
import styles from "./horseListItemStyle";
import { connect } from "react-redux";

class horseListItem extends React.Component{
  render(){
    const {horseItem, intlData} = this.props;
    let age = horseItem.age === null ? 0 : horseItem.age;
    age = userActions.calcuateHorseAge(age);
    // if(horseItem.image_type.toLowerCase() === "lower"){
    //   age = parseFloat(age) >= 17 ? "17 or Older" : parseFloat(age).toFixed(5);
    // }else{
    //   age = parseFloat(age) >= 20 ? "20 or Older" : parseFloat(age).toFixed(5);
    // }
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onClick}>
        <FastImage 
          resizeMode="cover"
          style={styles.horseImg}
          source={{ uri: horseItem.detect_file }}
        />
        <Text>
          {intlData.messages['history']['horseName'] + horseItem.name}
        </Text>
        <Text>
          {intlData.messages['history']['horseName'] + age}
        </Text>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})

export default connect(mapStateToProps, null)(horseListItem);