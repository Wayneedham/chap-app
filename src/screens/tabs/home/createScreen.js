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
      isUpload: false,
      initData: false
    };    
  }

  componentDidMount(){
  }
    
  componentWillReceiveProps(nextProps){
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(postDetectData !== ""){
        this.props.actions.postHorse(postDetectData);
        postDetectData = "";
      }else{
        if(nextProps.isactive === 0){
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
          else if(Object.keys(responseData).includes("email") && isUpgrade === true){   
            window.currentUser = responseData;
            userActions._storeData("userInfo", responseData);
            Alert.alert(
              "",
              this.props.intlData.messages['alert']['upgradedMembership'],
              [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
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
                    isUpload: false});    
                  postDetectData = "";    
                  this.props.actions.initReduxData(""); 
                }}],
                { cancelable: false }
              );  
            }else{
              recentData["detect_file"] = serverurl.server_url + (recentData["detect_file"]===''? recentData["file"] : recentData["detect_file"]);  
              recentData["file"] = serverurl.server_url + recentData["file"];            
              setTimeout(() => {
                Alert.alert(
                  "",
                  this.props.intlData.messages['alert']['wasDetectedImage'],
                  [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {              
                    this.setState({
                      isShowModal: false,
                      isUpload: false,
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
  }

  onCreateDetect =(userData)=>{        
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

    postDetectData = userData;
    this.setState({initData: false});
    const isFreeUser = window.currentUser["is_premium"];
    if(!isFreeUser){
      Alert.alert(
        "",
        this.props.intlData.messages['alert']['payAsYouGoPlan']
        [
          {text: this.props.intlData.messages['alert']['cancel'], onPress: () => console.log('Cancel Pressed')},
          { text: this.props.intlData.messages['alert']['ok'], onPress: () => {
            this.onSubScribe();       
          }}        
        ],
        { cancelable: false }
      );
    }else{
      this.setState({isShowModal: true, isUpload: true});
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
      this.setState({isShowModal: true, isUpload: false});
    }else{
      const userData = new FormData()
      userData.append('user', window.currentUser["id"]);
      userData.append('token', token);
      userData.append('type', "detection");
      this.props.actions.detectPurchase(userData);
      this.setState({isShowModal: true, isUpload: true});
    }    
  }

  onSubScribe =()=>{
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

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
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
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
    const{isShowModal, initData, isUpload} = this.state;
    const behavior = Platform.OS === 'ios' ? 'padding' : null
    return(
      
        <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={20} style={{flexGrow: 1}}>
            <ScrollView style={styles.container}>
              <CustomBar 
                title={this.props.intlData.messages['detection']['new']}
                navigate={this.props.navigation}
              />
              <DetectComponent 
                onPostHorse={this.onCreateDetect}
                onUpgrade={this.onUpgrade}
                initData={initData}
              />        
              <ProgressBar 
                isPending={isShowModal} 
                isTimer={isUpload ? true: false}/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({  
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),  
  pending: getDataPending(state.fetchdata),
  isactive: state.fetchdata.isactive,
  connection: state.connection.isConnected,
  intlData: state.IntlReducers
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