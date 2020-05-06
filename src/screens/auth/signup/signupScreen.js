import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextField } from "react-native-material-textfield";
import LoginComponent from "../../../components/login";
import styles from "../authScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import { connect } from "react-redux";

class signupScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userFname:"",
      userLname:"",
      userEmail: "",
      userPwd: "",
      userConfirmPwd:"",
      hidePassword: true
    };
  }

  onSignin() {
    Actions.pop();
  }

  render(){
    const { userEmail, userPwd, userConfirmPwd, hidePassword, userFname, userLname } = this.state;
    const behavior = Platform.OS === 'ios' ? 'padding' : null
    const {intlData} = this.props
    return (
      <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={20} style={{flexGrow: 1}}>
        <ScrollView style={styles.register_container}>
          <Text style={[styles.txt_title, fonts.montserrat_bold]}>
            {intlData.messages['auth']['signup']}
          </Text>
          <LoginComponent
            isLogin={false}
            userEmail={userEmail}
            userPwd={userPwd}
            userFname={userFname}
            userLname={userLname}
          />
          <View style={{ paddingVertical: 5 }}>
            <TextField
              ref={fname => {
                this.fnameInput = fname;
              }}
              label={intlData.messages['auth']['firstName']}
              value={userFname}
              onChangeText={fname => this.setState({ userFname: fname })}
              onSubmitEditing={() => this.lnameInput.focus()}
              returnKeyType="next"
            />
            <TextField
              ref={lname => {
                this.lnameInput = lname;
              }}
              label={intlData.messages['auth']['lastName']}
              value={userLname}
              onChangeText={lname => this.setState({ userLname: lname })}
              onSubmitEditing={() => this.emailInput.focus()}
              returnKeyType="next"
            />
            <TextField
              ref={email => {
                this.emailInput = email;
              }}
              label={intlData.messages['auth']['email']}
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
              label={intlData.messages['auth']['password']}
              value={userPwd}
              autoCapitalize={"none"}
              secureTextEntry={hidePassword}
              onChangeText={password => this.setState({ userPwd: password })}
              onSubmitEditing={() => this.confirmInput.focus()}
              returnKeyType="next"
            />
            <TextField
              ref={password => {
                this.confirmInput = password;
              }}
              label={intlData.messages['auth']['confirmPassword']}
              value={userConfirmPwd}
              autoCapitalize={"none"}
              secureTextEntry={hidePassword}
              onChangeText={password => this.setState({ userConfirmPwd: password })}
            />
          </View>
          
          <View style={styles.already_txt_register_container}>
            <Text style={[styles.already_txt, fonts.montserrat_regular]}>
              {intlData.messages['auth']['haveAccount?']}
            </Text>
            <TouchableOpacity onPress={() => this.onSignin()}>
              <Text
                style={[
                  styles.already_txt,
                  fonts.montserrat_semibold,
                  { textDecorationLine: "underline" }
                ]}
              >
                {intlData.messages['auth']['signin']}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})
export default connect(mapStateToProps, null)(signupScreen);