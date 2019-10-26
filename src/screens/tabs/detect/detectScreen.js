import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Progress from "react-native-progress";
import stripe from "tipsi-stripe";

import DetectComponent from "../../pagecomponents/detectComponent";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import ProgressBar from "../../../components/progressBar";
import styles from "./detectScreenStyle";
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

var postDetectData = "";

class detectScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      initData: false
    };    
  }
  
  componentWillReceiveProps(nextProps){    
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      console.log("test == ", responseData);
      
      if(postDetectData !== ""){
        this.props.actions.postHorse(postDetectData);
        postDetectData = "";
      }else{
        if(Object.keys(responseData).includes("message")){
          Alert.alert(
            "",
            responseData["message"],
            [{ text: "OK", onPress: () => {
              this.setState({isShowModal: false});              
            } }],
            { cancelable: false }
          );
        }
        else if(Object.keys(responseData).includes("recent")){   
  
          Alert.alert(
            "",
            "The image was detected successfully.",
            [{ text: "OK", onPress: () => {
              this.setState({isShowModal: false, initData: true});            
            }}],
            { cancelable: false }
          );
          console.log("post success  sss");     
        }
      }
    }
  }

  onCreateDetect =(userData)=>{    
    console.log("userData==", userData);
    postDetectData = userData;
    
    const isFreeUser = window.currentUser["is_premium"];
    if(!isFreeUser){
      Alert.alert(
        "",
        "Pay As You Go Plan - This plan allows you to check the age of your horse without being on a monthly subscription. For just $10, you will get a response from the CHAP program within the minute with the estimation of your horses age. Within the next 24 hours, you will get a response from our expert team either confirming or adjusting the estimation that CHAP provided. You will drive a long ways to find someone with more experience and expertise than our staff at CHAP. Thank you for your interest and we hope to serve you well..",
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
          { text: "OK", onPress: () => {
            this.onSubScribe();       
          }}        
        ],
        { cancelable: false }
      );
    }else{
      this.setState({isShowModal: true});
      this.props.actions.postHorse(userData);
    }    
  }

  onProcessPayment (token){
    const userData = new FormData()
    userData.append('user', window.currentUser["id"]);
    userData.append('token', token);
    userData.append('type', "detection");
    this.props.actions.detectPurchase(userData);
  }

  onSubScribe =()=>{
    this.setState({isShowModal: true});
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

  render(){
    const{isShowModal, initData} = this.state;
    console.log("isShowModal===", isShowModal);
    // const{pending} = this.props;
    return(
      <ScrollView style={styles.container}>
        <Text style={[styles.title, fonts.montserrat_bold]}>New</Text>
        <DetectComponent 
          onPostHorse={this.onCreateDetect}
          initData={initData}
        />        
        <ProgressBar 
          isPending={isShowModal}
        />
      </ScrollView>
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
      postHorse: userActions.postNewHorse,
      detectPurchase: userActions.videoPurchase,
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detectScreen);