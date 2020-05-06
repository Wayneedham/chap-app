import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IntlAction from "../../../actions/intlActions";

import styles from "./homeScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class homeScreen extends Component{
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){
    this.forceUpdate();
  }
  componentDidMount(){
    Orientation.lockToPortrait();
  }

  onDetect =()=>{
    this.props.navigation.navigate("create");
  }

  onCourse=()=>{
    this.props.navigation.navigate("video");
  }

  onAbout =()=>{
    this.props.navigation.navigate("about");
  }

  onTutorial =()=>{
    this.props.navigation.navigate("tutorial");
  }

  render(){
    const { intlData } = this.props;
    return(
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Text style={[styles.bigTxt, fonts.montserrat_bold]}>
              {intlData.messages['home']['welcome']}
            </Text>
            <Text style={[styles.bigTxt, fonts.montserrat_bold]}>
              {intlData.messages['home']['to']}
            </Text>
            <Image 
              style={styles.logo_img}
              source={require("../../../../assets/logo/small_logo.png")}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.buttonWrap} onPress={this.onDetect}>
            <Text style={[styles.buttonText, fonts.montserrat_bold]}>
              {intlData.messages['home']['ageDetection']}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrap} onPress={this.onCourse}>
            <Text style={[styles.buttonText, fonts.montserrat_bold]}>
              {intlData.messages['home']['videoCourse']}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutbtnWrap} onPress={this.onTutorial}>
            <Text style={[styles.aboutTxt, fonts.montserrat_bold]}>
              {intlData.messages['home']['tutorial']}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aboutbtnWrap} onPress={this.onAbout}>
            <Text style={[styles.aboutTxt, fonts.montserrat_bold]}>
              {intlData.messages['home']['aboutChap']}
            </Text>
          </TouchableOpacity>
          <View style={styles.helpWrap}>
            <Text style={styles.moreTxt}>{intlData.messages['home']['aboutLink']}</Text>
            <TouchableOpacity onPress={()=>{Linking.openURL("https://www.agemyhorse.com");}}>
              <Text style={styles.webTxt}>www.agemyhorse.com</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      intlData: state.IntlReducers
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(IntlAction, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(homeScreen);