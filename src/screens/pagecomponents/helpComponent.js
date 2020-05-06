import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';

import styles from "./helpComponentStyle";
import fonts from "../../sharedStyles/fontStyle";
import { connect } from 'react-redux';

class helpComponent extends Component{
  render(){
    const { isShow, intlData } = this.props;
    return(
      <Modal
        animationType={'slide'}
        visible={isShow}
        onRequestClose={()=>{}}>
        <ScrollView style={styles.container}>
          <View style={styles.topbar_wrap}>
            <Text style={[styles.title, fonts.montserrat_bold]}>
              {intlData.messages['page']['imageType']}
            </Text>
            <TouchableOpacity style={styles.dismissWrap} onPress={this.props.onDone}>
              <Text style={[styles.dismiss, fonts.montserrat_bold]}>
                {intlData.messages['page']['done']}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.txtContainer}>
            {
              intlData.messages['home'].tutorialList1.map((title,index)=>(
                <View style={styles.rowWrap} key={index}>
                  <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{(index+1) + ". "}</Text>
                  <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{title}</Text>
                </View>
              ))
            }
          </View>
          <View>
            <Image 
              source={require("../../../assets/image/horse_1.jpg")}
              resizeMode={"contain"}
              style={[styles.horseImg, {marginTop: 20}]}
            />
            <Image 
              source={require("../../../assets/image/horse_2.jpg")}
              resizeMode={"contain"}
              style={[styles.horseImg, {marginVertical: 40}]}
            />
          </View>
          <View style={styles.txtContainer}>
            {
              intlData.messages['home'].tutorialList2.map((title,index)=>(
                <View style={styles.rowWrap} key={index}>
                  <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{(index+5) + ". "}</Text>
                  <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{title}</Text>
                </View>
              ))
            }
          </View>
          <View style={{height: 100}}/>
        </ScrollView>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => {
  return {
      intlData: state.IntlReducers
  };
};
export default connect(
  mapStateToProps,
  null
)(helpComponent);