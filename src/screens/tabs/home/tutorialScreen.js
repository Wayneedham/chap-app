import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

import CustomBar from "../../../components/customBar";
import CourseItem from "../../../components/courseItem";
import styles from "./tutorialScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

const tutorialList1 = [
  "Clear, not Blurry",
  "Straight on, not at an angle.",
  "Contain all Lower Teeth, with minimal other objects in the photo. (If necessary please crop out other objects)",
  "Like the following Images"
]

const tutorialList2 = [
  "Program can only detect up to 17 Yesrs Old by using the Lower Image.",
  "Program can only detect up to 20 Yesrs Old by using the Upper Image.",
  "User will receive a 3 Year Range from CHAP Within the minute, and will receive a 2 Year and 1 Year estimation from our Experts within 24 hours. Our experts will be able to give an Estimation higher than 20 Years Old.",
  "To understand this Process and Learn for yourself, Please subscribe to our Instructional Video Course."
]


class tutorialScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false
    };   
  }
  
  onVideoPlay =()=>{
    this.setState({isShowModal: true})
  }

  onDismiss(){
    this.setState({isShowModal: false});
  }

  render(){
    const{isShowModal} = this.state;
    return(
      <ScrollView style={styles.container}>
        <CustomBar 
          title={"Tutorial"}
          navigate={this.props.navigation}
        />
        <Text style={[styles.detailTxt, fonts.montserrat_regular]}>Watch the Tutorial</Text>
        <TouchableOpacity style={styles.videoPlayWrap} onPress={()=>this.onVideoPlay()}>
          <Image 
            style={styles.videoPlayImg}
            resizeMode="contain"
            source={require("../../../../assets/icons/icon_videoplay.png")}
          />
        </TouchableOpacity> 
        <View style={styles.txtContainer}>
          {
            tutorialList1.map((title,index)=>(
              <View style={styles.rowWrap}>
                <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{(index+1) + ". "}</Text>
                <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{title}</Text>
              </View>
            ))
          }           
        </View>
        <View>
          <Image 
            source={require("../../../../assets/image/horse_1.jpg")}
            resizeMode={"contain"}
            style={[styles.horseImg, {marginTop: 20}]}
          />         
          <Image 
            source={require("../../../../assets/image/horse_2.jpg")}
            resizeMode={"contain"}
            style={[styles.horseImg, {marginVertical: 40}]}
          />
        </View>
        <View style={styles.txtContainer}>
          {
            tutorialList2.map((title,index)=>(
              <View style={styles.rowWrap}>
                <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{(index+5) + ". "}</Text>
                <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{title}</Text>
              </View>
            ))
          }           
        </View>        
        <Modal
          animationType="slide"
          transparent={false}
          visible={isShowModal}
          onRequestClose={()=>{}}>
          <VideoPlayer
            source={{ uri: "https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course2.MOV" }}            
            onBack={()=>this.onDismiss()}
          />
        </Modal>
        <View style={{height: 100}}/>
      </ScrollView>
    )
  }
}
export default tutorialScreen;