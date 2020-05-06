import React, { Component } from 'react';
import {
  View,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from "react-native-material-textfield";

import {getDataError, getDataSuccess, getDataPending} from '../../../reducers/fetchdata';
import CustomBar from "../../../components/customBar";
import CustomButton from "../../../components/customButton";
import * as userActions from "../../../actions/userActions";
import serverurl from '../../../../config/const/serverurl'; 
import styles from "./changePwdScreenStyle";

class changePasswordScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cPwd: "",
      nPwd: "",
      vPwd: "",
      isPending: false
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ isPending: nextProps.pending });
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(nextProps.isactive === 4){
        if(Object.keys(responseData).includes("message")){
          console.log("pwd error=", responseData)
          this.showAlert(responseData["message"]);
        }
        else if(Object.keys(responseData).includes("id")){       
          Alert.alert(
            "",
            this.props.intlData.messages['alert']['updatedPassword'],
            [{ text: this.props.intlData.messages['alert']['ok'], onPress: () => {
              this.props.navigation.goBack();         
            }}],
            { cancelable: false }
          );
        }
      }      
    }
  }

  onChangePwd =()=>{
    const{cPwd, nPwd, vPwd} = this.state;
    if (cPwd === "") {
      this.showAlert(this.props.intlData.messages['alert']['enterOldPassword']);
      return;
    }
    if (nPwd === "") {
      this.showAlert(this.props.intlData.messages['alert']['enterOldPassword']);
      return;
    }
    if (vPwd === "") {
      this.showAlert(this.props.intlData.messages['alert']['enterVerifyPassword']);
      return;
    }

    if (nPwd !== vPwd) {
      this.showAlert(this.props.intlData.messages['alert']['doesNotMatchedVerifyPassword']);
      return;
    }
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
    const url = serverurl.basic_url + 'changepassword';
    const userData = new FormData();
    userData.append('email', window.currentUser["email"]);
    userData.append('old_password', cPwd);
    userData.append('new_password', nPwd);
    this.props.actions.changePassword(userData, url);
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
    const{cPwd, nPwd, vPwd, isPending} = this.state;
    return(
      <View style={styles.container}>
        <CustomBar 
          title={this.props.intlData.messages['settings']['changePassword']}
          navigate={this.props.navigation}
        />
        <View style={{ paddingVertical: 5 }}>
          <TextField
            ref={cPwd => {
              this.cPwdInput = cPwd;
            }}
            label={"Current password"}
            value={cPwd}
            secureTextEntry={true}
            onChangeText={text => this.setState({ cPwd: text })}
            onSubmitEditing={() => this.nPwdInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={nPwd => {
              this.nPwdInput = nPwd;
            }}
            label={"New password"}
            value={nPwd}
            secureTextEntry={true}
            onChangeText={text => this.setState({ nPwd: text })}
            onSubmitEditing={() => this.vPwdInput.focus()}
            returnKeyType="next"
          />
          <TextField
            ref={vPwd => {
              this.vPwdInput = vPwd;
            }}
            label={"Verify password"}
            value={vPwd}
            secureTextEntry={true}
            autoCapitalize={"none"}
            onChangeText={text => this.setState({ vPwd: text })}
            returnKeyType="done"
          />
        </View>
        <CustomButton 
          title={"CHANGE PASSWORD"}
          onClick={this.onChangePwd}
          isPending={isPending}
        />        
      </View>
    )
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
      changePassword: userActions.postRequest,
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(changePasswordScreen);