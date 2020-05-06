import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import CustomBar from "../../../components/customBar";
import styles from "./aboutScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import { connect } from "react-redux";

class aboutScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <CustomBar 
          title={this.props.intlData.messages['home']['about']}
          navigate={this.props.navigation}
        />
        <ScrollView>
          <Text style={[styles.aboutTxt, fonts.montserrat_semibold]}>
            {this.props.intlData.messages['home'].aboutDescription.join('\n')}
          </Text>
        </ScrollView>
      </View>
      
    )
  }
}
const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})
export default connect(mapStateToProps, null)(aboutScreen);