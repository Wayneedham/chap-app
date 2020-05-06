import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { TextField } from "react-native-material-textfield";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProgressBar from "../../../components/progressBar";
import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import * as userActions from "../../../actions/userActions";
import serverurl from '../../../../config/const/serverurl';
import CustomButton from "../../../components/customButton";
import fonts from "../../../sharedStyles/fontStyle";
import styles from "./profileScreenStyle";

class profileScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      userFname: window.currentUser["first_name"],
      userLname: window.currentUser["last_name"],
      userEmail: window.currentUser["email"],
      isPending: false
    };
  }

  componentWillReceiveProps(nextProps){    
    if(nextProps.pending === false){
      const responseData = nextProps.data;

      if(nextProps.isactive === 4){
        if(Object.keys(responseData).includes("message")){  
          let errorMsg = responseData["message"];
          if(errorMsg.includes("returned more than one Custom"))
            errorMsg = this.props.intlData.messages['alert']['foundIssueWithRequest']
          Alert.alert(
            "",
            errorMsg,
            [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
              this.setState({isPending: false});
            }}],
            { cancelable: false }
          ); 
        }
        else if(Object.keys(responseData).includes("id")){
          window.currentUser = responseData;
          userActions._storeData("userInfo", responseData);
          Alert.alert(
            "",
            this.props.intlData.messages['alert']['youUpdatedAccount'],
            [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
              this.setState({isPending: false});
              this.props.actions.initReduxData("");
            }}],
            { cancelable: false }
          );
        }
      }
    }
  }

  onProfileUpdate =()=>{
    const url = serverurl.basic_url + 'changeprofile';
    const { userEmail, userFname, userLname } = this.state;

    if (userEmail === "") {
      this.showAlert(this.props.intlData.messages['alert']['enterNewEmailAddress']);
      return;
    }

    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
    
    this.setState({isPending: true});
    const userData = new FormData();
    userData.append('user_id', window.currentUser["id"]);
    userData.append('email', userEmail);
    if(userFname !== "")
      userData.append('first_name', userFname);
    if(userLname !== "")
      userData.append('last_name', userLname);
    this.props.actions.userPostRequest(userData, url);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  onCancelSubscribe =()=>{
    const url = serverurl.basic_url + 'downgrade';
    const userData = new FormData();
    userData.append('email', window.currentUser["email"]);
    this.props.actions.userPostRequest(userData, url);

    this.setState({isPending: true});
  }

  showAlert(message) {
    Alert.alert(
      "",
      message,
      [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  render(){
    const { userEmail, userFname, userLname, isPending } = this.state;
    const {is_social, is_premium} = window.currentUser;
    return (
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.barTitle, fonts.montserrat_bold]}>
          {this.props.intlData.messages['settings']['myAccount']['account']}
          </Text>
          <TouchableOpacity style={styles.back_wrap} onPress={this.goBack}>
            <Image
              source={require("../../../../assets/icons/icon_back_white.png")}
              style={styles.back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {
            is_premium &&
            <TouchableOpacity style={styles.unsubscribe_wrap} onPress={this.onCancelSubscribe}>
              <Text style={styles.unsubscribe_txt}>
                {this.props.intlData.messages['settings']['myAccount']['unsubscribe']}
              </Text>
            </TouchableOpacity>
          }          
        </View>
        <View style={{ paddingVertical: 5 }}>
          <TextField
            ref={fname => {
              this.fnameInput = fname;
            }}
            label={this.props.intlData.messages['auth']['firstName']}
            value={userFname}
            onChangeText={fname => this.setState({ userFname: fname })}
            onSubmitEditing={() => this.lnameInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={lname => {
              this.lnameInput = lname;
            }}
            label={this.props.intlData.messages['auth']['lastName']}
            value={userLname}
            onChangeText={lname => this.setState({ userLname: lname })}
            onSubmitEditing={() => this.emailInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={email => {
              this.emailInput = email;
            }}
            label={this.props.intlData.messages['auth']['email']}
            value={userEmail}
            autoCapitalize={"none"}
            onChangeText={email => this.setState({ userEmail: email })}
            returnKeyType="done"
          />
        </View>
        {
          is_social===false &&
          <CustomButton 
            title={this.props.intlData.messages['settings']['myAccount']['update']}
            onClick={this.onProfileUpdate}
            isPending={isPending}
          />            
        }
        <ProgressBar 
          isPending={isPending}
        /> 
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  connection: state.connection.isConnected,
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      userPostRequest: userActions.postRequest,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profileScreen);