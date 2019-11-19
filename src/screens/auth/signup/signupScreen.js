import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextField } from "react-native-material-textfield";
import LoginComponent from "../../../components/login";
import styles from "../authScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

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
    return (
      <ScrollView style={styles.register_container}>
        <Text style={[styles.txt_title, fonts.montserrat_bold]}>
          Sign Up
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
            label={"First Name"}
            value={userFname}
            onChangeText={fname => this.setState({ userFname: fname })}
            onSubmitEditing={() => this.lnameInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={lname => {
              this.lnameInput = lname;
            }}
            label={"Last Name"}
            value={userLname}
            onChangeText={lname => this.setState({ userLname: lname })}
            onSubmitEditing={() => this.emailInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={email => {
              this.emailInput = email;
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
          <TextField
            ref={password => {
              this.confirmInput = password;
            }}
            label={"Confirm Password"}
            value={userConfirmPwd}
            autoCapitalize={"none"}
            secureTextEntry={hidePassword}
            onChangeText={password => this.setState({ userConfirmPwd: password })}
          />
        </View>
        
        <View style={styles.already_txt_register_container}>
          <Text style={[styles.already_txt, fonts.montserrat_regular]}>
            Already have an account ?
          </Text>
          <TouchableOpacity onPress={() => this.onSignin()}>
            <Text
              style={[
                styles.already_txt,
                fonts.montserrat_semibold,
                { textDecorationLine: "underline" }
              ]}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default signupScreen;