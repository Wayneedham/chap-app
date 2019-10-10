import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as Progress from "react-native-progress";
import {
  responsiveHeight
} from "react-native-responsive-dimensions";

// import * as userActions from "../../../actions/userActions";
import styles from "./loginStyle";
import fonts from "../sharedStyles/fontStyle";

var createdUser = {
  Pseudo: null,
  Email: null,
  isFBLogin: false,
  isPremium: false,
  Currency: "EUR",
  Capital: {}
};

export default class LoginComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  onSignin(flag) {
    if (flag) {
      this.onUserSignin();
    } else {
      this.onUserSignup();
    }
  }

  onFacebook() {
    userActions.handleFacebookLogin(this);
  }

  onGoogle() {
    userActions.handleGoogleLogin();
  }

  async checkMailExist(mail) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(mail)) {
      console.log("exist email check")
    }
  }

  onUserSignup() {
    const { userEmail, userPwd } = this.props;

    if (userEmail === "" || userPwd === "") {
      this.showAlert("Enter email or password.");
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(userEmail)) {
      console.log("sign up process")
    }
  }

  onUserSignin() {
    const { userEmail, userPwd } = this.props;

    this.setState({ isLoading: true });

    if (userEmail === "" || userPwd === "") {
      this.showAlert("Enter email or password.");
      return;
    }
    Actions.reset("customTabNavigator", { tabIndex: 0 });
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
    return (
      <View style={styles.input_container}>
        <TouchableOpacity
          onPress={() => this.onSignin(this.props.isLogin)}
          style={
            this.props.hasAcceptedTerms !== undefined
              ? this.props.hasAcceptedTerms
                ? styles.signin_container
                : styles.signin_container_off
              : styles.signin_container
          }
        >
          <Text style={[styles.signin_txt, fonts.montserrat_regular]}>
            {this.props.isLogin ? "Sign In" : "Sign Up"}
          </Text>
          {this.state.isLoading && (
            <Progress.CircleSnail
              color={"#fff"}
              style={{
                position: "absolute",
                top: responsiveHeight(2),
                right: responsiveHeight(3),
                zIndex: 10
              }}
              size={responsiveHeight(4)}
              indeterminate={true}
            />
          )}
        </TouchableOpacity>

        <View>
          <Text style={[styles.input_container_ortxt, fonts.montserrat_medium]}>
            {"or connect with social"}
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
                {"Facebook"}
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
