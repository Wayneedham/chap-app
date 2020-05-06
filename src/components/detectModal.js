import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {
  responsiveWidth
} from 'react-native-responsive-dimensions';
import Dialog from "react-native-dialog";

import * as userActions from "../actions/userActions";
import styles from "./detectModalStyle";
import fonts from "../sharedStyles/fontStyle";
import { connect } from "react-redux";
import ProgressBar from './progressBar';

class detectModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      calcImgHeight: 0,
      horseAge: ""
    }
  }

  onConfirm(){
    const{horseAge} = this.state;
    if(parseInt(horseAge, 10) > 0){
      this.props.handleConfirm(horseAge)
    }
  }

  render(){
    const{recentData, intlData, isShowModal, isPromptDialog} = this.props;
    let age = "";
    if(recentData !== undefined && recentData !== ""){
      age = recentData.age === null ? 0 : recentData.age;
      age = userActions.calcuateHorseAge(age, recentData.image_type);
    }
    const {calcImgHeight, horseAge} = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <Text style={[styles.title, fonts.montserrat_bold]}>{intlData.messages['detection']['detectResult']}</Text>
          <TouchableOpacity style={styles.back_wrap} onPress={this.props.onDone}>
            <Image
              source={require("../../assets/icons/icon_back_white.png")}
              style={styles.back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
        </View>
        <View style={styles.itemWrap}>
          <Text style={[styles.itemTitle, fonts.montserrat_bold]}>
            {intlData.messages['detection']['imageType']}
          </Text>
          <Text style={[styles.itemTitle, fonts.montserrat_medium]}>{recentData["image_type"]}</Text>
        </View>
        <View style={styles.itemWrap}>
          <Text style={[styles.itemTitle, fonts.montserrat_bold]}>
            {intlData.messages['detection']['detectedAge']}
          </Text>
          <Text style={[styles.itemTitle, fonts.montserrat_medium]}>{age}</Text>
        </View>
        <View style={styles.imgWrap}>
          <FastImage 
            resizeMode="contain"
            style={{ width: responsiveWidth(94), height: calcImgHeight }}
            source={{ uri: recentData.detect_file }}
            onLoad={evt =>
              this.setState({
                calcImgHeight:
                  evt.nativeEvent.height / evt.nativeEvent.width * responsiveWidth(94), // By this, you keep the image ratio
              })}
          />
        </View>
        {
          isPromptDialog && (
            <Dialog.Container visible={isPromptDialog}>
              <Dialog.Title>{intlData.messages['detection']['justCuriouse']}</Dialog.Title>
              <Dialog.Description>
                <Text style={fonts.montserrat_bold}> {intlData.messages['detection']['horseAgeOld']}</Text>
              </Dialog.Description>
              <Dialog.Input 
                placeholder={intlData.messages['detection']['enterHorseAge']}
                value={horseAge}
                keyboardType={'decimal-pad'}
                returnKeyType={'done'}
                onChangeText={txt => this.setState({ horseAge: txt })}
              />
              <Dialog.Button label="Ok" onPress={()=>this.onConfirm()}/>
            </Dialog.Container>
          )
        }
        <ProgressBar
          isPending = {isShowModal}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})
export default connect(mapStateToProps, null)(detectModal);