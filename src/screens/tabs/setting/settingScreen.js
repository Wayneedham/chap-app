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
      'Would you like to Log Out? ',
      [
        {text: this.props.intlData.messages['alert']['ok'], onPress: () =>{this.onUserLogout()}},
        {text: this.props.intlData.messages['alert']['cancel'], onPress: () => console.log('Cancel Pressed')}
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

  onLanguageSettings(){
    this.props.navigation.navigate("languages");
  }

  onContactSupport(){
    Linking.openURL('mailto:support@agemyhorse.com');
  }

  render(){
    const isPremium = window.currentUser["is_premium"];
    const isSocial = window.currentUser["is_social"];
    return(
      <View style={styles.container}>
        <Text style={[styles.title, fonts.montserrat_bold]}>
          {this.props.intlData.messages['settings']['settings']}
        </Text>
        <TouchableOpacity 
          style={[styles.row_wrap, styles.item_wrap_top_border]} 
          onPress={()=>this.onUpdateAccount()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>
            {this.props.intlData.messages['settings']['myAccount']['myAccount']}
          </Text>
          <View style={styles.pro}>
            <Text style={[styles.proText, fonts.montserrat_semibold]}>
              {isPremium 
                ? this.props.intlData.messages['settings']['myAccount']['pro'] 
                : this.props.intlData.messages['settings']['myAccount']['free']
              }
            </Text>
          </View>
        </TouchableOpacity>
        {
          isSocial ? (
            <View style={styles.item_wrap}>
              <Text style={[styles.item_wrap_txt_social, fonts.montserrat_regular]}>
                {this.props.intlData.messages['settings']['changePassword']}
              </Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.item_wrap} 
              onPress={()=>this.onChangePassword()}>
              <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>
                {this.props.intlData.messages['settings']['changePassword']}
              </Text>
            </TouchableOpacity>
          )
        }
        {
          isPremium === false && (
            <TouchableOpacity style={styles.item_wrap} onPress={()=>this.onMembership()}>
              <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>
                {this.props.intlData.messages['settings']['paymentOptions']}
              </Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity style={[styles.item_wrap, {marginTop: 50}, styles.item_wrap_top_border]} onPress={()=>this.onLanguageSettings()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>
            {this.props.intlData.messages['settings']['languages']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item_wrap, {marginTop: 50}, styles.item_wrap_top_border]} onPress={()=>this.onContactSupport()}>
          <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>
            {this.props.intlData.messages['settings']['contactSupport']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item_wrap, styles.log_out_wrap, styles.item_wrap_top_border]} onPress={()=>this.onLogout()}>
          <Text style={styles.item_wrap_txt}>
            {this.props.intlData.messages['settings']['logOut']}
          </Text>
        </TouchableOpacity>
        <View style={styles.logo_container}>
          <Image
            style={styles.logo_img}
            source={require("../../../../assets/logo/small_logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.small_txt}>
            {this.props.intlData.messages['version']}
          </Text>
        </View>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
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

