import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import DetectComponent from "../../pagecomponents/detectComponent";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import ProgressBar from "../../../components/progressBar";
import styles from "./detectScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import serverurl from '../../../../config/const/serverurl';
import stripe, {optionsCardForm} from '../../../../config/stripe';
import moment from "moment";

let postDetectData = "";
let isUpgrade = false;

class detectScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      initData: false
    };
  }
  
  componentWillReceiveProps(nextProps){ 
    const responseData = nextProps.data;
    if(nextProps.pending === false && responseData!==""){
      if(postDetectData !== ""){
        this.props.actions.postHorse(postDetectData);
        postDetectData = "";
      }else{
        if(nextProps.isactive === 2) {
          if(Object.keys(responseData).includes("message")){
            Alert.alert(
              "",
              responseData["message"],
              [{ text: "OK", onPress: () => {
                this.setState({isShowModal: false});     
                // this.props.actions.initReduxData("");         
              } }],
              { cancelable: false }
            );
          }
          else if(Object.keys(responseData).includes("id") && isUpgrade === true){   
            window.currentUser = responseData;
            userActions._storeData("userInfo", responseData);            
            Alert.alert(
              "",
              "The membership was upgraded successfully.",
              [{ text: "OK", onPress: () => {
                this.setState({isShowModal: false});     
                // this.props.actions.initReduxData("");     
              }}],
              { cancelable: false }
            );   
          }
          else if(Object.keys(responseData).includes("recent")){           
            const recentData = responseData["recent"];
            if(recentData["detect_file"]===''){
              Alert.alert(
                "",
                "Cannot detect this image. Please try another image again.",
                [{ text: "OK", onPress: () => {  
                  this.setState({recentData: "", isShowModal: false, initData: true});    
                  postDetectData = "";    
                  // this.props.actions.initReduxData(""); 
                }}],
                { cancelable: false }
              );  
            }else{              
              Alert.alert(
                "",
                "The image was detected successfully",
                [{text: "OK", onPress: ()=>{
                  recentData["detect_file"] = serverurl.server_url + recentData["detect_file"];
                  recentData["file"] = serverurl.server_url + recentData["file"];                 
                  this.setState({
                    isShowModal: false,
                    initData: true});  
                  postDetectData = ""; 
                  Actions.detectResultScreen({recentData});
                }}]
              )
            }          
          }
          this.props.actions.initReduxData(""); 
        }        
      }
    }    
  }

  onCreateDetect =(userData)=>{        
    console.log("window.currentUser=", window.currentUser);
    postDetectData = userData;
    this.setState({initData: false});
    let isProUser = window.currentUser["is_premium"];
    
    if(!isProUser && window.currentUser["is_video"]===true){
      const video_purchase_date = moment(window.currentUser['video_created_at']);  
      const diff_days = moment().diff(video_purchase_date, "days");
      console.log("diff ==", diff_days);
      if(diff_days < 31){
        isProUser = true;
      }
    }
    
    if(!isProUser){
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
      postDetectData = "";
    }    
  }

  onProcessPayment (token){    
    if(isUpgrade){
      const url = serverurl.basic_url + 'upgrade';
      const userData = new FormData()
      userData.append('email', window.currentUser["email"]);
      userData.append('token', token);
      this.props.actions.postNewRequest(userData, url);    // upgrade membership
    }else{
      const userData = new FormData()
      userData.append('user', window.currentUser["id"]);
      userData.append('token', token);
      userData.append('type', "detection");
      this.props.actions.detectPurchase(userData);
    }
    this.setState({isShowModal: true});
  }

  onSubScribe =()=>{
    isUpgrade = false;    
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

  onUpgrade =()=>{
    isUpgrade = true;  
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
    const behavior = Platform.OS === 'ios' ? 'padding' : null
    return(
      <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={20} style={{flexGrow: 1}}>
        <ScrollView style={styles.container}>
          <Text style={[styles.title, fonts.montserrat_bold]}>New</Text>
          <DetectComponent 
            onPostHorse={this.onCreateDetect}
            onUpgrade={this.onUpgrade}
            initData={initData}
          />  
          <ProgressBar 
            isPending={isShowModal}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  pending: getDataPending(state.fetchdata)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      postHorse: userActions.postNewHorse,
      postNewRequest: userActions.postRequest,
      detectPurchase: userActions.videoPurchase,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(detectScreen);