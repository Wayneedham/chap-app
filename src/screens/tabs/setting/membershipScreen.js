import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';

import CustomBar from "../../../components/customBar";
import * as userActions from "../../../actions/userActions";
import serverurl from '../../../../config/const/serverurl'; 
import styles from "./membershipScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class membershipScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <CustomBar 
          title={"Change Password"}
          navigate={this.props.navigation}
        />
        <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
          About monthly subscription:
          {"\n"}{"\n"}They get unlimited aging for $20 per month. $10 is how much they pay per each use if not on the unlimited program
        </Text>
        <View style={styles.subscribeWrap}>
          <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.props.onSubScribe()}>
            <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>        
      </View>
    )
  }
}

export default membershipScreen;