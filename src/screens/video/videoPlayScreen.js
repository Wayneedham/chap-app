import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';

import styles from "./videoPlayScreenStyle";

class videoPlayScreen extends Component{

  onBack(){
    Actions.pop();
  }

  componentDidMount(){
    Orientation.lockToLandscape();
  }

  componentWillUnmount(){
    Orientation.lockToPortrait();
  }

  render(){
    const {video_url} = this.props;
    return(
      <View style={styles.container}>
        <VideoPlayer
          source={{ uri: video_url }}
          onBack={()=>this.onBack()}
          onEnd={()=>this.onBack()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})

export default connect(mapStateToProps, null)(videoPlayScreen);