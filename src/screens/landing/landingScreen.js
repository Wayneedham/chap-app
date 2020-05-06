import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import { Actions } from "react-native-router-flux";
import * as userActions from "../../actions/userActions";
import styles from "./landingScreenStyle";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as IntlAction from "../../actions/intlActions";

class landingScreen extends Component{

  componentDidMount(){
    setTimeout(()=>{
      userActions._retrieveData("logged").then(value => {
        userActions._retrieveData('lang').then((lang)=>{
          this.props.actions.intlAction(lang);
        });
        if(value=="true"){
          userActions._retrieveData('userInfo').then((data) => {
            const userInfo = JSON.parse(data);
            window.currentUser = userInfo;
            Actions.reset("customTabNavigator");
          })
        }else{
          Actions.reset("loginScreen");
        }
      })
    }, 2000)
  }

  render(){
    const { intlData } = this.props;
    return(
      <View style={styles.container}>
        <Image 
          style={styles.landing}
          source={require("../../../assets/image/bg_splash.png")}
          resizeMode="contain"
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      intlData: state.IntlReducers
  };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
      {
        intlAction: IntlAction.updateLanguage,
      },
      dispatch
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(landingScreen);