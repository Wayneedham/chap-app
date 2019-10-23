import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextField } from "react-native-material-textfield";
import LoginComponent from "../../../components/login";
import styles from "../authScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class loginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPwd: "",
      hidePassword: true
    };
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

  componentDidMount(){
  }

  async componentWillMount(){
    if(Platform.OS === 'android')
    {
      this.requestCameraPermission();
    } 
  }

  togglePassword() {
    if (this.state.hidePassword == true) {
      console.log("hide");
      this.setState({ hidePassword: false });
    } else {
      console.log("show");
      this.setState({ hidePassword: true });
    }
  }

  handleResponse = (error) => {
      this.setState({modalVisible: error});
  }

  onSignup() {
    Actions.signupScreen();
  }

  render() {
    const { userEmail, userPwd, hidePassword } = this.state;
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
          onPress={() => Actions.forgotPassword()}
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
      </View>
    );
  }
}

export default loginScreen;
