import React, { Component } from 'react';
import {
  View,
  Text,
  Modal
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

import CourseItem from "../../../components/courseItem";
import CustomBar from "../../../components/customBar";
import styles from "./videoScreenStyle";

class courseScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      videoURL: ""
    };   
  }

  onSubScribe =()=>{

  }

  onVideoPlay =(url)=>{
    this.setState({videoURL: url, isShowModal: true})
  }

  onDismiss(){
    this.setState({isShowModal: false});
  }

  render(){
    const{isShowModal, videoURL} = this.state;
    return(
      <View style={styles.container}>
        <CustomBar 
          title={"Course"}
          navigate={this.props.navigation}
        />
        <View style={styles.course_container}>
          <CourseItem 
            isSubscribe={false}
            onSubScribe={this.onSubScribe}
            onVideoPlay={this.onVideoPlay}
            courseTitleText={"Course 1"}
            courseDetailText={"This is test description for course 1"}
            URL={"https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}
          />
          <CourseItem 
            isSubscribe={true}
            onSubScribe={this.onSubScribe}
            onVideoPlay={this.onVideoPlay}
            courseTitleText={"Course 2"}
            courseDetailText={"This is test description for course 2"}
            URL={"https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isShowModal}
          onRequestClose={()=>{}}>
          <VideoPlayer
            source={{ uri: videoURL }}            
            onBack={()=>this.onDismiss()}
          />
        </Modal>
      </View>
    )
  }
}

export default courseScreen;