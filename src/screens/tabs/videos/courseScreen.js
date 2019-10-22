import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

import CourseItem from "../../../components/courseItem";
import styles from "./courseScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

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
    console.log("urlll===", url);
    this.setState({videoURL: url, isShowModal: true})
  }

  onDismiss(){
    this.setState({isShowModal: false});
  }

  render(){
    const{isShowModal, videoURL} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>Course</Text>        
        </View>
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