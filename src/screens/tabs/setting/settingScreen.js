import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { getDataError, getDataSuccess, getDataPending, setReduxAddInfo } from "../../../reducers/fetchdata";
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
    userActions.fblogOut();
    this.props.actions.initReduxData("");
    userActions.clearData();
    Actions.reset("loginScreen");
  }

  onUpdateAccount(){
    this.props.navigation.navigate("profile");
  }

  onChangePassword(){
    this.props.navigation.navigate("changepwd");
  }

  onMembership(){
    this.props.navigation.navigate("membership");
  }

  onContactSupport(){
    Linking.openURL('mailto:support@agemyhorse.com');
  }

  render(){   
    const isPremium = window.currentUser["is_premium"];
    const isSocial = window.currentUser["is_social"];
    return(
      <View style={styles.container}>
        <Text style={[styles.title, fonts.montserrat_bold]}>Setttings</Text>
        <TouchableOpacity 
          style={[styles.row_wrap, styles.item_wrap_top_border]} 
          onPress={()=>this.onUpdateAccount()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>My Account</Text>
          <View style={styles.pro}>
            <Text style={[styles.proText, fonts.montserrat_semibold]}>
              {isPremium ? "PRO" : "FREE"}
            </Text>
          </View>
        </TouchableOpacity>
        {
          isSocial ? (
            <View style={styles.item_wrap}>
              <Text style={[styles.item_wrap_txt_social, fonts.montserrat_regular]}>Change Password</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.item_wrap} 
              onPress={()=>this.onChangePassword()}>
              <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>Change Password</Text>
            </TouchableOpacity>
          )
        }
        {
          isPremium === false && (
            <TouchableOpacity style={styles.item_wrap} onPress={()=>this.onMembership()}>
              <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>Upgrade Membership</Text>
            </TouchableOpacity>
          )
        }

        <TouchableOpacity style={[styles.item_wrap, {marginTop: 50}, styles.item_wrap_top_border]} onPress={()=>this.onContactSupport()}>
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


const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  pending: getDataPending(state.fetchdata)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(settingScreen);

