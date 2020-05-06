import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CustomBar from "../../../components/customBar";
import ProgressBar from "../../../components/progressBar";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import serverurl from '../../../../config/const/serverurl'; 
import styles from "./membershipScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import stripe, {optionsCardForm} from '../../../../config/stripe';

let upgrade = 'trial'; 

class membershipScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isPending: false
    };   
  }

  componentWillReceiveProps(nextProps){ 
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(nextProps.isactive === 4){
        if(Object.keys(responseData).includes("message")){
          Alert.alert(
            "",
            responseData["message"],
            [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {this.setState({isPending: false});} }],
            { cancelable: false }
          );
        }
        else if(Object.keys(responseData).includes("id")){   
          window.currentUser = responseData;
          userActions._storeData("userInfo", responseData);
          if(upgrade !== 'trial'){
            Alert.alert(
              "",
              this.props.intlData.messages['alert']['upgradedMembership'],
              [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
                this.setState({isPending: false});
                this.props.actions.initReduxData("");
                this.props.navigation.goBack();
              }}],
              { cancelable: false }
            );
          }else{
            Alert.alert(
              "",
              this.props.intlData.messages['alert']['purchasedVideosForCourse'],
              [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
                this.setState({isPending: false});
                this.props.actions.initReduxData("");
                this.props.navigation.goBack();
              }}],
              { cancelable: false }
            );
          }    
        }      
      }
    }
  }

  onProcessPayment (token){
    if(upgrade !== 'trial'){
      const url = serverurl.basic_url + 'upgrade';
      const userData = new FormData()
      userData.append('email', window.currentUser["email"]);
      userData.append('token', token);
      userData.append('subscription', upgrade)
      this.props.actions.upgradeMembership(userData, url);
    }else{
      const url = serverurl.basic_url + 'charge';
      const userData = new FormData();
      userData.append('user', window.currentUser["id"]);
      userData.append('token', token);
      userData.append('type', "video");
      this.props.actions.upgradeMembership(userData, url);
    }
    this.setState({isPending: true});
  }

  onSubScribe(){
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
        this.onProcessPayment(token.tokenId);
    })
    .catch(error => {
      console.warn("Payment failed", { error });    
    });
  }

  onUpgrade(){
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

  onAnnuallyUpgrade(){
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
    const{isPending} = this.state;
    const isVideo = window.currentUser["is_video"];
    const isPremium = window.currentUser["is_premium"];
    return(
      <ScrollView style={styles.container}>
        <CustomBar 
          title={"Membership"}
          navigate={this.props.navigation}
        />
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
          {this.props.intlData.messages['settings']['membership'].content1.join('\n')}
        </Text>
        {
          isPremium !== 'monthly' && (
            <View>
              <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
                {this.props.intlData.messages['settings']['membership'].content2.join('\n')}
              </Text>
              <View style={styles.subscribeWrap}>
                <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onUpgrade()}>
                  <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>
                    {this.props.intlData.messages['settings']['membership']['upgradeToUnlimited']}
                  </Text>
                  <Text style={[styles.update_small_txt, fonts.montserrat_semibold]}>
                    {this.props.intlData.messages['detection']['detectionButton']['subscription']}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
          {this.props.intlData.messages['settings']['membership'].content3.join('\n')}
        </Text>
        <View style={styles.subscribeWrap}>
          <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onAnnuallyUpgrade()}>
            <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>
              {this.props.intlData.messages['settings']['membership']['upgradeToUnlimited']}
            </Text>
            <Text style={[styles.update_small_txt, fonts.montserrat_semibold]}>
              {this.props.intlData.messages['detection']['detectionButton']['annuallySubscription']}
            </Text>
          </TouchableOpacity>
        </View>  
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
          {this.props.intlData.messages['settings']['membership'].content4.join('\n')}
        </Text>
        {
          isVideo === false && (
            <View style={[styles.subscribeWrap, {marginBottom: 50}]}>
              <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onSubScribe()}>
                <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>
                  {this.props.intlData.messages['page']['buyNow']}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
        <ProgressBar 
          isPending={isPending}
        /> 
      </ScrollView>
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
      upgradeMembership: userActions.postRequest,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(membershipScreen);
