import React, {Component} from 'react'
import {
  TouchableOpacity,
  Text
} from 'react-native';
import * as Progress from "react-native-progress";
import {
  responsiveHeight
} from "react-native-responsive-dimensions";

import styles from "./customButtonStyle";
import fonts from "../sharedStyles/fontStyle";

class customButton extends Component{
  render(){
    const{title, isPending} = this.props;
    return(
      <TouchableOpacity
        style={styles.update_container}
        onPress={this.props.onClick}
      >
        <Text style={[styles.update_txt, fonts.montserrat_semibold]}>
          {title}
        </Text>
        {isPending && (
          <Progress.CircleSnail
            color={"#fff"}
            style={{
              position: "absolute",
              top: responsiveHeight(2),
              right: responsiveHeight(3),
              zIndex: 10
            }}
            size={responsiveHeight(4)}
            indeterminate={true}
          />
        )}
      </TouchableOpacity>
    )
  }
}

export default customButton;