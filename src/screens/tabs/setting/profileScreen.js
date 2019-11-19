import React, { Component } from 'react';
import {
  View,
  Alert
} from 'react-native';

import { TextField } from "react-native-material-textfield";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getDataError, getDataSuccess, getDataPending, setReduxAddInfo} from '../../../reducers/fetchdata';
import * as userActions from "../../../actions/userActions";
import serverurl from '../../../../config/const/serverurl';
import CustomBar from "../../../components/customBar";
import CustomButton from "../../../components/customButton";
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
          this.showAlert(responseData["message"]);
          Alert.alert(
            "",
            responseData["message"],
            [{ text: "OK", onPress: () => {
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
            "You updated account successfully.",
            [{ text: "OK", onPress: () => {
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
      this.showAlert("Enter new email address please.");
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
    this.props.actions.changeProfile(userData, url);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  showAlert(message) {
    Alert.alert(
      "",
      message,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  render(){
    const { userEmail, userFname, userLname, isPending } = this.state;
    const {is_social} = window.currentUser;
    return (
      <View style={styles.container}>
        <CustomBar 
          title={"Account"}
          navigate={this.props.navigation}
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
            returnKeyType="done"
          />
        </View>
        {
          is_social===false &&
          <CustomButton 
            title={"UPDATE"}
            onClick={this.onProfileUpdate}
            isPending={isPending}
          />            
        }
        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  pending: getDataPending(state.fetchdata)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      changeProfile: userActions.postRequest,
      initReduxData: setReduxAddInfo
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(profileScreen);