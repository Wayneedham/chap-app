import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import DialogInput from 'react-native-dialog-input';
import { TextField } from "react-native-material-textfield";

import * as userActions from "../../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import LoginComponent from "../../../components/login";
import ProgressBar from "../../../components/progressBar";
import serverurl from '../../../../config/const/serverurl';
import styles from "../authScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class loginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPwd: "",
      isShowModal: false,
      hidePassword: true,
      isDialogVisible: false
    };
  }

  componentWillReceiveProps(nextProps){
    console.log("forgot === ", nextProps);
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ])
      console.log("permissions status: " +JSON.stringify(granted));
    } catch (err) {
      console.log(err)
    }
  }

  async componentWillMount(){
    if(Platform.OS === 'android')
    {
      this.requestCameraPermission();
    } 
  }

  togglePassword() {
    if (this.state.hidePassword == true) {     
      this.setState({ hidePassword: false });
    } else {      
      this.setState({ hidePassword: true });
    }
  }

  handleResponse = (error) => {
      this.setState({modalVisible: error});
  }

  onSignup() {
    Actions.signupScreen();
  }

  onForgotPassword(){
    this.setState({isDialogVisible: true});
  }

  onSendPassword(email){   
    if(userActions.verficationEmail(email)){
      const url = serverurl.basic_url + 'forgotpassword';
      const userData = new FormData();
      userData.append('email', email);

      this.props.actions.forgotPassword(userData, url);  
      this.setState({isDialogVisible: false});
    }    
  }

  render() {
    const { userEmail, userPwd, hidePassword, isDialogVisible, isShowModal } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.txt_title, fonts.montserrat_bold]}>
          Sign In
        </Text>
        <View style={{ paddingVertical: 5, height: 150 }}>
          <TextField
            ref={login => {
              this.loginInput = login;
            }}
            label={"Email"}
            value={userEmail}
            autoCapitalize={"none"}
            onChangeText={email => this.setState({ userEmail: email })}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={password => {
              this.passwordInput = password;
            }}
            label={"Password"}
            value={userPwd}
            autoCapitalize={"none"}
            secureTextEntry={hidePassword}
            onChangeText={password => this.setState({ userPwd: password })}
          />
          <TouchableOpacity
            style={styles.showpwd_icon_wrap}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => this.togglePassword()}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../../../../assets/icons/showPassword.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ flexDirection: "row", marginTop: 25 }}
          onPress={() => this.onForgotPassword()}
        >
          <Text style={[styles.already_txt, fonts.montserrat_regular]}>
            Forgot password ? 
          </Text>
          <Text
            style={[
              styles.already_txt,
              fonts.montserrat_regular,
              { textDecorationLine: "underline" }
            ]}
          >
            Reset password
          </Text>
        </TouchableOpacity>

        <LoginComponent
          isLogin={true}
          userEmail={userEmail}
          userPwd={userPwd}
        />

        <View style={styles.already_txt_container}>
          <Text style={[styles.already_txt, fonts.montserrat_regular]}>
            Don’t have an Account ?
          </Text>
          <TouchableOpacity onPress={() => this.onSignup()}>
            <Text
              style={[
                styles.already_txt,
                fonts.montserrat_semibold,
                { textDecorationLine: "underline" }
              ]}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </View>

        <DialogInput 
          isDialogVisible={isDialogVisible}
          title={"Forgot Password"}
          message={"Enter your email address please."}
          hintInput ={"Email address"}
          submitInput={ (inputText) => {this.onSendPassword(inputText)} }
          closeDialog={ () => {this.setState({isDialogVisible: false})}}>
        </DialogInput>

        <ProgressBar 
          isPending={isShowModal}
        />
      </View>
    );
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
      forgotPassword: userActions.postRequest,
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginScreen);
