import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import stripe from "tipsi-stripe";

import CustomBar from "../../../components/customBar";
import ProgressBar from "../../../components/progressBar";
import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import serverurl from '../../../../config/const/serverurl'; 
import styles from "./membershipScreenStyle";
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

class membershipScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isPending: false
    };   
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps === ", nextProps);    
    if(nextProps.pending === false){
      const responseData = nextProps.data;
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
        Alert.alert(
          "",
          "The membership was upgraded successfully.",
          [{ text: "OK", onPress: () => {
            this.setState({isPending: false});   
            this.props.navigation.goBack();         
          }}],
          { cancelable: false }
        );
        console.log("post success  sss");     
      }
    }
  }

  onProcessPayment (token){
    const url = serverurl.basic_url + 'upgrade';
    const userData = new FormData()
    userData.append('email', window.currentUser["email"]);
    userData.append('token', token);
    this.props.actions.upgradeMembership(userData, url);

    this.setState({isPending: true});
  }

  onSubScribe(){
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
      <View style={styles.container}>
        <CustomBar 
          title={"Membership"}
          navigate={this.props.navigation}
        />
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
          About monthly subscription:
          {"\n"}{"\n"}They get unlimited aging for $20 per month. $10 is how much they pay per each use if not on the unlimited program
        </Text>
        <View style={styles.subscribeWrap}>
          <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onSubScribe()}>
            <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>       
        <ProgressBar 
          isPending={isPending}
        /> 
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
      upgradeMembership: userActions.postRequest,
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(membershipScreen);
