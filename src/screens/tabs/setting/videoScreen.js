import React, { Component } from 'react';
import VideoPlayer from 'react-native-video-controls';

class videoScreen extends Component{
  render(){
    return(
      <VideoPlayer
        source={{ uri: 'https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV' }}
        navigator={ this.props.navigation }
      />
    )
  }
}

export default videoScreen;