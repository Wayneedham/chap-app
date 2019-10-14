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
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onClick}>
        <FastImage 
          resizeMode="cover"
          style={styles.horseImg}
          source={{ uri: horseItem.image }}
        />
        <Text>
          {"Image Type: " + horseItem.type}
        </Text>
        <Text>
          {"Age: " + parseFloat(horseItem.age).toFixed(5)}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default horseListItem;