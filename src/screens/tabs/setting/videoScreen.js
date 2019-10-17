import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Video from 'react-native-video';

import CustomBar from "../../../components/customBar";
import styles from "./videoScreenStyle";

class videoScreen extends Component{

  onBuffer =()=>{

  }

  videoError =()=>{

  }
  render(){
    return(
      <View style={styles.container}>
        <CustomBar 
          title={"Course"}
          navigate={this.props.navigation}
        />
        <Video source={{uri: "https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onError={this.videoError}      
        />
      </View>
    )
  }
}

export default videoScreen;