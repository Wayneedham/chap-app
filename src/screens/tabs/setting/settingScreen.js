import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { setReduxAddInfo } from "../../../reducers/fetchdata";
import * as userActions from "../../../actions/userActions";
import styles from "./settingScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class settingScreen extends Component{
  onLogout(){
    Alert.alert(
      '',
      'Would you log out now ? ',
      [
        {text: 'OK', onPress: () =>{this.onUserLogout()}},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')}        
      ],
      { cancelable: false }
    )
  }

  onUserLogout(){
    this.props.actions.initLoginData("");
    userActions.clearData();
    Actions.reset("loginScreen");
  }

  onUpdateAccount(){
    this.props.navigation.navigate("profile");
  }

  onChangePassword(){

  }

  onCourseVideo(){
    this.props.navigation.navigate("video");
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={[styles.title, fonts.montserrat_bold]}>Setttings</Text>
        <TouchableOpacity style={[styles.row_wrap, styles.item_wrap_top_border]} onPress={()=>this.onUpdateAccount()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>My Account</Text>
          <View style={styles.pro}>
            <Text style={[styles.proText, fonts.montserrat_semibold]}>
              FREE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item_wrap} onPress={()=>this.onChangePassword()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item_wrap}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>Upgrade Membership</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.item_wrap, {marginTop: 50}, styles.item_wrap_top_border]}
          onPress={()=>this.onCourseVideo()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>Play Course Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item_wrap}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item_wrap, styles.log_out_wrap, styles.item_wrap_top_border]} onPress={()=>this.onLogout()}>
          <Text style={styles.item_wrap_txt}>Log Out</Text>
        </TouchableOpacity>
        <View style={styles.logo_container}>
          <Image
            style={styles.logo_img}
            source={require("../../../../assets/logo/small_logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.small_txt}>Version 1.0</Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      initLoginData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(settingScreen);
