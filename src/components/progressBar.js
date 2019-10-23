import React, { Component } from 'react';
import {
  View,
  Modal
} from 'react-native';
import * as Progress from "react-native-progress";
import styles from "./progressBarStyle";

class progressBar extends Component{
  render(){
    const{isPending} = this.props;
    return(
      <Modal          
        animationType={'none'}
        transparent={true}
        visible={isPending}
        onRequestClose={()=>{}}>
        <View style={styles.progressWrap}>
          <Progress.Circle size={60} indeterminate={true} color={"blue"}/>
        </View>          
      </Modal>
    )
  }
}

export default progressBar;