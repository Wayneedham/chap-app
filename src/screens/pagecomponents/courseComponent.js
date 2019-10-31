import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VideoPlayer from 'react-native-video-controls';
import stripe from "tipsi-stripe";

import * as userActions from "../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../reducers/fetchdata';

import ProgressBar from "../../components/progressBar";
import CourseItem from "../../components/courseItem"; 
import styles from "./courseComponentStyle";
import fonts from "../../sharedStyles/fontStyle";

stripe.setOptions({
  publishableKey: "pk_test_mEk3SpdSiKRzNQADwueQKbpR" // client test : pk_live_i5V112Spm1uMo3odGTGW9E3s
});
const optionsCardForm = {
  theme: {
    primaryForegroundColor: "#585F6F",
    accentColor: "#FFCF1B"
  }
};

class courseComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isPending: false,
      videoURL: ""
    };   
  }

 componentWillReceiveProps(nextProps){
    this.setState({ isPending: nextProps.pending });
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(Object.keys(responseData).includes("message")){
        console.log("purchase error")
      }
      else if(Object.keys(responseData).includes("id")){
        console.log("purchase success111 ==", responseData);       
        window.currentUser = responseData;
        userActions._storeData("userInfo", responseData);
      }
    }
  }

  onProcessPayment (token){
    const userData = new FormData()
    userData.append('user', window.currentUser["id"]);
    userData.append('token', token);
    userData.append('type', "video");
    this.props.actions.videoPurchase(userData);
  }

  onSubScribe =()=>{
    stripe
    .paymentRequestWithCardForm(optionsCardForm)
    .then(token => {
      if(token)
        this.onProcessPayment(token.tokenId);
    })
    .catch(error => {
      console.warn("Payment failed", { error });    
    });
  }

  onVideoPlay =(url)=>{
    this.setState({videoURL: url, isShowModal: true})
  }

  onDismiss(){
    this.setState({isShowModal: false});
  }
  
  render(){
    const isPurchase = window.currentUser["is_video"];
    const{isShowModal, videoURL, isPending} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.videoWrap}>
          <Text style={[styles.comeTxt, fonts.montserrat_semibold]}>Coming Soon....</Text>            
        </View>
        {/* {
          isPurchase === false ? (
            <ScrollView>        
              <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
                If you are seeing this message, then you haven’t yet decided to take our video course. Let me explain how the video course works. Aging horses is an art and a science. It is an intriguing process that every horse owner should know. This information is not new, but older than the New Testament of the Bible.
                {"\n"}630 BC, the Chinese taught aging for the purpose of sale or trade because they knew the value of their horse is directly related to its age.
                {"\n"}430 BC Simon of Athens wrote about aging in a book called the Veterinary Art.
                {"\n"}{"\n"}The first video, “The Science Video,” is an in-depth, graphically rich 27-minute video that gives you the knowledge of anatomy and the changing characteristics of the tooth as it wears. To truly understand how aging works and your horse’s mouth, this is a must-watch.
                {"\n"}The second video, “The Art Video,” analyzes pictures of the horse’s teeth at every age, showing how easy it is to age horses using recognition and the patterns learned in the “Science Video.” Aging horses is really easy! It just takes a little practice and a little information to become proficient.
                {"\n"}{"\n"}I put my students through this exact same program in the classroom and within 30-40 images, they become extremely proficient. The more you watch the “Art Video” the better you will become. We have amazing results in the classroom and these practitioners become very passionate because they have confidence. You can gain that same confidence very quickly with minimal effort by studying our video courses!
              </Text>    
              <View style={styles.subscribeWrap}>
                <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onSubScribe()}>
                  <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Buy Now</Text>
                </TouchableOpacity>    
              </View>      
            </ScrollView>
          ) : (
            <View style={styles.videoWrap}>
              <Text style={[styles.comeTxt, fonts.montserrat_semibold]}>Coming Soon....</Text>
               <CourseItem                 
                onVideoPlay={this.onVideoPlay}               
                URL={"https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}
              />
              <CourseItem                 
                onVideoPlay={this.onVideoPlay}               
                URL={"https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}
              /> 
            </View>
          )
        } */}
        <ProgressBar 
          isPending={isPending}
        />

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

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  pending: getDataPending(state.fetchdata)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      videoPurchase: userActions.videoPurchase,
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(courseComponent);