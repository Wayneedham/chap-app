import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from "react-native-router-flux";
import NetInfo from "@react-native-community/netinfo";

import * as userActions from "../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../reducers/fetchdata';
import { setReduxAddInfo } from "../reducers/fetchdata";
import { setNetworkConnect } from "../reducers/connection";
import CustomButton from "./customButton";

import styles from "./loginStyle";
import fonts from "../sharedStyles/fontStyle";

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: this.props.pending
    };
  }

  componentDidMount()
  {
    NetInfo.addEventListener(state => {
      let isConnected = false;
      if(state.isConnected){
        if(state.isInternetReachable === null)
          isConnected = false;
        else{
          if(state.type === 'unknown' || state.type==='none')
            isConnected = false;
          else
            isConnected = true;
        }
      }else
        isConnected = false;
      this.props.actions.setNetworkConnect(isConnected);
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({ isLoading: nextProps.pending });
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(Object.keys(responseData).includes("message")){       
        Alert.alert(
          "",
          responseData["message"],
          [{ text: "OK", onPress: () => {this.props.actions.initResponseData("");}}],
          { cancelable: false }
        );
      }
      else if(Object.keys(responseData).includes("id")){
        window.currentUser = responseData;
        userActions._storeData("logged", true);
        userActions._storeData("userInfo", responseData);
        Actions.reset("customTabNavigator", { tabIndex: 0 });
      }
    }
  }

  onSignin(flag) {
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }

    if (flag) {
      this.onUserSignin();
    } else {
      this.onUserSignup();
    }
  }

  onFacebook() {
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
    this.props.actions.userSocialLogin();
  }

  async checkMailExist(mail) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(mail)) {
      console.log("exist email check")
    }
  }

  onUserSignup() {
    const { userEmail, userPwd, userFname, userLname } = this.props;
    if (userFname === "" || userLname === "") {
      this.showAlert(this.props.intlData.messages['auth']['enterFullName']);
      return;
    }

    if (userEmail === "" || userPwd === "") {
      this.showAlert(this.props.intlData.messages['auth']['enterEmailOrPassword']);
      return;
    }
   
    if (userActions.verficationEmail(userEmail)) {
      const userData = new FormData()
      userData.append('email', userEmail);
      userData.append('last_name', userLname);
      userData.append('first_name', userFname);
      userData.append('password', userPwd);
      this.props.actions.userSignup(userData);
    }else{
        this.showAlert(this.props.intlData.messages['auth']['enterValidEmailAddress']);
        return;
    }
  }

  onUserSignin() {
    const { userEmail, userPwd } = this.props;

    if (userEmail === "" || userPwd === "") {
      this.showAlert("Enter email or password.");
      return;
    }
    
    if (userActions.verficationEmail(userEmail)) {
      const userData = new FormData()
      userData.append('email', userEmail);
      userData.append('password', userPwd);
      this.props.actions.userLogin(userData);
    }else{
        this.showAlert(this.props.intlData.messages['auth']['enterValidEmailAddress']);
        return;
    }
    // Actions.reset("customTabNavigator", { tabIndex: 0 });
  }

  showAlert(message) {
    Alert.alert(
      "",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  render() {
    const{isLoading} = this.state;
    const { intlData } = this.props;
    return (
      <View style={styles.input_container}>
        <CustomButton 
          title={this.props.isLogin ? intlData.messages['auth']['signin'] : intlData.messages['auth']['signup']}
          onClick={() => this.onSignin(this.props.isLogin)}
          isPending={isLoading}
        />  
        <View>
          <Text style={[styles.input_container_ortxt, fonts.montserrat_medium]}>
            {intlData.messages['auth']['connectSocial']}
          </Text>

          <TouchableOpacity
              onPress={() => this.onFacebook()}
              style={styles.social_container}
            >
              <Image
                style={styles.socialIcon}
                source={require("../../assets/icons/facebook.png")}
                resizeMode="contain"
              />
              <Text style={[styles.social_txt, fonts.montserrat_regular]}>
                {intlData.messages['auth']['facebook']}
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  connection: state.connection.isConnected,
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      userLogin: userActions.userLogin,
      userSocialLogin: userActions.handleFacebookLogin,
      userSignup: userActions.userSignup,
      setNetworkConnect: setNetworkConnect,
      initResponseData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
