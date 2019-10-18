import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import FastImage from 'react-native-fast-image';
import styles from "./horseListItemStyle";

class horseListItem extends React.Component{
  render(){
    const {horseItem} = this.props;
    const age = horseItem.age === null ? 0 : horseItem.age;
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onClick}>
        <FastImage 
          resizeMode="cover"
          style={styles.horseImg}
          source={{ uri: horseItem.file }}
        />
        <Text>
          {"Image Type: " + horseItem.image_type}
        </Text>
        <Text>
          {"Age: " + parseFloat(age).toFixed(3)}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default horseListItem;