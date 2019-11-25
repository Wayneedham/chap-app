import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Modal
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

let isUpgrade = false;

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
            [{ text: "OK", onPress: () => {this.setState({isPending: false});} }],
            { cancelable: false }
          );
        }
        else if(Object.keys(responseData).includes("id")){   
          window.currentUser = responseData;
          userActions._storeData("userInfo", responseData);
          if(isUpgrade){
            Alert.alert(
              "",
              "The membership was upgraded successfully.",
              [{ text: "OK", onPress: () => {
                this.setState({isPending: false});  
                this.props.actions.initReduxData("");  
                this.props.navigation.goBack();         
              }}],
              { cancelable: false }
            );
          }else{
            Alert.alert(
              "",
              "You purchased videos for course successfully.",
              [{ text: "OK", onPress: () => {
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
    if(isUpgrade){
      const url = serverurl.basic_url + 'upgrade';
      const userData = new FormData()
      userData.append('email', window.currentUser["email"]);
      userData.append('token', token);
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
    Alert.alert("", "The feature will come soon.")
    // isUpgrade = false;
    // stripe
    // .paymentRequestWithCardForm(optionsCardForm)
    // .then(token => {
    //   if(token)
    //     this.onProcessPayment(token.tokenId);
    // })
    // .catch(error => {
    //   console.warn("Payment failed", { error });    
    // });
  }

  onUpgrade(){
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
    const{isPending} = this.state;
    return(
      <ScrollView style={styles.container}>
        <CustomBar 
          title={"Membership"}
          navigate={this.props.navigation}
        />
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
        1. Pay as you Go - $10/Horse
        {"\n"}{" "}A. Available at anytime with this free App
        {"\n"}{" "}B. You will get an estimation from CHAP within 30 seconds and another Age Estimation from our Expert Team within 24 hours.

        {"\n"}{"\n"}2. Unlimited Use - $20/Month
        {"\n"}{" "}A. Age as many Horses and as many Pictures as you’d like for just $20/Month
        {"\n"}{" "}B. You will get an Estimation from CHAP within 30 seconds and another Age Estimation from our expert team within 24 hours.
        </Text>
        <View style={styles.subscribeWrap}>
          <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onUpgrade()}>
            <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Upgrade To Unlimited</Text>
          </TouchableOpacity>
        </View>  
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
        {"\n"}3. Video Course - $99
        {"\n"}{" "}A. Learn how to Age Horses in 2 - 30 Minute Videos. These Videos are yours to View forever. We have taught 100’s of Equine Dental Students and. Veterinarians to Age Horses using these proven techniques. You can easily learn the Art of Aging Horses from the comfort of hour Easy Chair. We guarantee you’ll be satisfied with your experience, or we will give your money back. The only question asked will be how can we improve your experience. Thank you for your interest in Horses, and Thank You for your interest in aging.
        </Text>
        <View style={[styles.subscribeWrap, {marginBottom: 50}]}>
          <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onSubScribe()}>
            <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Buy Now</Text>
          </TouchableOpacity>
        </View>       
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
  pending: getDataPending(state.fetchdata)
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
