import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { TextField } from "react-native-material-textfield";
import * as Progress from "react-native-progress";

import CustomBar from "../../../components/customBar";
import styles from "./changePwdScreenStyle";

class changePasswordScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cPwd: "",
      nPwd: "",
      vPwd: "",
      isLoading: false
    };
  }

  render(){
    const{cPwd, nPwd, vPwd, isLoading} = this.state;
    return(
      <View style={styles.container}>
        <CustomBar 
          title={"Change Password"}
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
        <TouchableOpacity
          style={styles.update_container}
        >
          <Text style={[styles.update_txt, fonts.montserrat_regular]}>
            {"CHANGE PASSWORD"}
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
    )
  }
}

export default changePasswordScreen;