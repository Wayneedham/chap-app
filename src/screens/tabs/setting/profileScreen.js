import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { TextField } from "react-native-material-textfield";
import * as Progress from "react-native-progress";

import CustomBar from "../../../components/customBar";
import styles from "./profileScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class profileScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      userFname: window.currentUser["first_name"],
      userLname: window.currentUser["last_name"],
      userEmail: window.currentUser["email"],
      isLoading: false
    };
  }

  componentDidMount(){
    console.log("current = ", window.currentUser);
  }

  onProfileUpdate(){

  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  render(){
    const { userEmail, userFname, userLname, isLoading } = this.state;
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
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
          />
        </View>
        <TouchableOpacity
          onPress={() => this.onProfileUpdate()}
          style={styles.update_container}
        >
          <Text style={[styles.update_txt, fonts.montserrat_regular]}>
            {"UPDATE"}
          </Text>
          {isLoading && (
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
      </View>
    );
  }
}

export default profileScreen;