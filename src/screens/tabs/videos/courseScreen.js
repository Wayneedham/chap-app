import React, { Component } from 'react';
import {
  View,
  Text,
  Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VideoPlayer from 'react-native-video-controls';
import stripe from "tipsi-stripe";

import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import CourseItem from "../../../components/courseItem";
import ProgressBar from "../../../components/progressBar";
import styles from "./courseScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

stripe.setOptions({
  publishableKey: "pk_test_mEk3SpdSiKRzNQADwueQKbpR" // client test : pk_live_i5V112Spm1uMo3odGTGW9E3s
});
const optionsCardForm = {
  theme: {
    primaryForegroundColor: "#585F6F",
    accentColor: "#FFCF1B"
  }
};
class courseScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isPending: false,
      videoURL: ""
    };   
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps === ", nextProps);
    this.setState({ isPending: nextProps.pending });
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(Object.keys(responseData).includes("message")){
        console.log("purchase error")
      }
      else if(Object.keys(responseData).includes("id")){
        console.log("purchase success ==", responseData);       
        window.currentUser = responseData;
        userActions._storeData("userInfo", responseData);
      }
    }
  }

  onProcessPayment (token){
    console.log("token ==", token);
    console.log("current==", window.currentUser);
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
    console.log("urlll===", url);
    this.setState({videoURL: url, isShowModal: true})
  }

  onDismiss(){
    this.setState({isShowModal: false});
  }

  render(){
    const{isShowModal, videoURL, isPending} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>Course</Text>        
        </View>
        <View style={styles.course_container}>
          <CourseItem 
            isSubscribe={window.currentUser["is_video"]}
            onSubScribe={this.onSubScribe}
            onVideoPlay={this.onVideoPlay}
            courseTitleText={"Course 1"}
            courseDetailText={"This is test description for course 1"}
            URL={"https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}
          />
          <CourseItem 
            isSubscribe={window.currentUser["is_video"]}
            onSubScribe={this.onSubScribe}
            onVideoPlay={this.onVideoPlay}
            courseTitleText={"Course 2"}
            courseDetailText={"This is test description for course 2"}
            URL={"https://ml-ref-data.s3.us-east-2.amazonaws.com/course/course1.MOV"}
          />
        </View>

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
)(courseScreen);