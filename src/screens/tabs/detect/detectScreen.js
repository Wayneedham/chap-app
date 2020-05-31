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
let upgrade = 'trial';

class detectScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isUpload: false,
      initData: false
    };
  }
  
  componentWillReceiveProps = (nextProps) => { 
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
              [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
                this.setState({isShowModal: false});
                this.props.actions.initReduxData("");
              } }],
              { cancelable: false }
            );
          }
          else if(Object.keys(responseData).includes("email") && upgrade !== 'trial'){   
            window.currentUser = responseData;
            userActions._storeData("userInfo", responseData);
            Alert.alert(
              "",
              this.props.intlData.messages['alert']['upgradedMembership'],
              [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
                upgrade = 'trial';
                this.setState({isShowModal: false});
                this.props.actions.initReduxData("");
              }}],
              { cancelable: false }
            );   
          }
          else if(Object.keys(responseData).includes("recent")){
            const recentData = responseData["recent"];
            if(recentData["detect_file"]===''){
              Alert.alert(
                "",
                this.props.intlData.messages['alert']['cannotDetectImage'],
                [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {  
                  this.setState({
                    recentData: "", 
                    isShowModal: false, 
                    initData: true, 
                    isUpload: false
                  });
                  postDetectData = "";
                  this.props.actions.initReduxData(""); 
                }}],
                { cancelable: false }
              );  
            }else{
              Alert.alert(
                "",
                this.props.intlData.messages['alert']['wasDetectedImage'],
                [{text: this.props.intlData.messages['alert']['ok'], onPress: ()=>{
                  recentData["detect_file"] = serverurl.server_url + recentData["detect_file"];
                  recentData["file"] = serverurl.server_url + recentData["file"];
                  this.setState({
                    isShowModal: false,
                    isUpload: false,
                    initData: true
                  });
                  postDetectData = "";
                  Actions.detectResultScreen({recentData});
                  this.props.actions.initReduxData("");
                }}]
              )
            }
          } 
        }
      }
    }
  }

  onCreateDetect = (userData) => {
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

    this.setState({initData: false});
    let isProUser = window.currentUser["is_premium"];
    
    if(isProUser === 'trial' && window.currentUser["is_video"]===true){
      const video_purchase_date = moment(window.currentUser['video_created_at']);
      const diff_days = moment().diff(video_purchase_date, "days");
      if(diff_days < 31){
        isProUser = 'monthly';
      }
    }
    
    if(isProUser === 'trial'){
      Alert.alert(
        "",
        this.props.intlData.messages['alert']['payAsYouGoPlan'],
        [
          {text: this.props.intlData.messages['alert']['cancel'], onPress: () => console.log('Cancel Pressed')},
          { text: this.props.intlData.messages['alert']['ok'], onPress: () => {
            this.onSubScribe(userData);
          }}
        ],
        { cancelable: false }
      );
    }else{
      this.setState({isShowModal: true, isUpload: true});
      postDetectData = "";
      this.props.actions.postHorse(userData);
      
    }
  }

  onProcessPayment (token, horseData){
    if(upgrade !== 'trial'){
      const url = serverurl.basic_url + 'upgrade';
      const userData = new FormData()
      userData.append('email', window.currentUser["email"]);
      userData.append('token', token);
      userData.append('subscription', upgrade);
      console.log(userData, url)
      this.props.actions.postNewRequest(userData, url);    // upgrade membership
      this.setState({isShowModal: true, isUpload: false});
    }else{
      const userData = new FormData()
      userData.append('user', window.currentUser["id"]);
      userData.append('token', token);
      userData.append('type', "detection");
      this.setState({isShowModal: true, isUpload: true});
      postDetectData = horseData;
      this.props.actions.detectPurchase(userData);
      // this.props.actions.postHorse(horseData);
    }
  }

  onSubScribe =(horseData)=>{
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

    upgrade = 'trial';
    stripe
    .paymentRequestWithCardForm(optionsCardForm)
    .then(token => {
      if(token)
        this.onProcessPayment(token.tokenId, horseData);
    })
    .catch(error => {
      console.warn("Payment failed", { error });
    });
  }

  onUpgrade =()=>{
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

    upgrade = 'monthly';
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

  onAnnuallyUpgrade =()=>{
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

    upgrade = 'annually';
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
    const{isShowModal, initData, isUpload} = this.state; 
    const behavior = Platform.OS === 'ios' ? 'padding' : null
    return(
      <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={20} style={{flexGrow: 1}}>
        <ScrollView style={styles.container}>
          <Text style={[styles.title, fonts.montserrat_bold]}>
            {this.props.intlData.messages['detection']['new']}
          </Text>
          <DetectComponent 
            onPostHorse={this.onCreateDetect}
            onUpgrade={this.onUpgrade}
            onAnnuallyUpgrade={this.onAnnuallyUpgrade}
            initData={initData}
          />  
          <ProgressBar 
            isPending={isShowModal}
            isTimer={isUpload ? true: false}
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
  connection: state.connection.isConnected,
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
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