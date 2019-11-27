import React, { Component } from 'react';
import {
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import DetectComponent from "../../pagecomponents/detectComponent";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import ProgressBar from "../../../components/progressBar";
import CustomBar from "../../../components/customBar";
import styles from "./createScreenStyle";
import serverurl from '../../../../config/const/serverurl';
import stripe, {optionsCardForm} from '../../../../config/stripe';

let postDetectData = "";
let isUpgrade = false;

class createScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      initData: false
    };    
  }
  
  componentDidMount(){
    console.log("postDetectData==", this.props.data);
  }
  
  componentWillReceiveProps(nextProps){    
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      console.log("responseData create==", responseData);
      if(postDetectData !== ""){
        this.props.actions.postHorse(postDetectData);
        postDetectData = "";
      }else{
        if(nextProps.isactive === 0){
          if(Object.keys(responseData).includes("message")){
            Alert.alert(
              "",
              responseData["message"],
              [{ text: "OK", onPress: () => {
                this.setState({isShowModal: false});     
                this.props.actions.initReduxData("");         
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
                this.props.actions.initReduxData("");    
              }}],
              { cancelable: false }
            );
            console.log("post success  sss");     
          }
          else if(Object.keys(responseData).includes("recent")){ 
            const recentData = responseData["recent"]; 
            recentData["detect_file"] = serverurl.server_url + (recentData["detect_file"]===''? recentData["file"] : recentData["detect_file"]);  
            recentData["file"] = serverurl.server_url + recentData["file"];            
            setTimeout(() => {
              Alert.alert(
                "",
                "The image was detected successfully.",
                [{ text: "OK", onPress: () => {              
                  this.setState({
                    isShowModal: false,
                    initData: true});  
                  postDetectData = ""; 
                  Actions.detectResultScreen({recentData});
                  this.props.actions.initReduxData(""); 
                }}],
                { cancelable: false }
              );
            }, 300);
          }
        }        
      }
    }
  }

  onCreateDetect =(userData)=>{    
    postDetectData = userData;
    this.setState({initData: false});
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
      postDetectData = "";
    }    
  }

  onProcessPayment (token){
    if(isUpgrade){
      const url = serverurl.basic_url + 'upgrade';
      const userData = new FormData()
      userData.append('email', window.currentUser["email"]);
      userData.append('token', token);
      this.props.actions.upgradeMembership(userData, url);
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
          <CustomBar 
            title={"New"}
            navigate={this.props.navigation}
          />
          <DetectComponent 
            onPostHorse={this.onCreateDetect}
            onUpgrade={this.onUpgrade}
            initData={initData}
          />        
          <ProgressBar isPending={isShowModal}/>       
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
      upgradeMembership: userActions.postRequest,
      detectPurchase: userActions.videoPurchase,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createScreen);