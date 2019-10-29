import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';

import styles from "./helpComponentStyle";
import fonts from "../../sharedStyles/fontStyle";

class helpComponent extends Component{
  render(){
    const{isShow} = this.props;
    return(
      <Modal
        animationType={'slide'}      
        visible={isShow}
        onRequestClose={()=>{}}>
        <View style={styles.container}>
          <View style={styles.topbar_wrap}>
            <Text style={[styles.title, fonts.montserrat_bold]}>Image Type</Text>
            <TouchableOpacity style={styles.dismissWrap} onPress={this.props.onDone}>
              <Text style={[styles.dismiss, fonts.montserrat_bold]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.rowWrap}>
              <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{"1. "}</Text>
              <Text style={[styles.detailTxt, fonts.montserrat_regular]}>Clear, not Blurry</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{"2. "}</Text>
              <Text style={[styles.detailTxt, fonts.montserrat_regular]}>Straight on, not at an angle.</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{"3. "}</Text>
              <Text style={[styles.detailTxt, fonts.montserrat_regular]}>Contain all Lower Teeth, with minimal other objects in the photo. (If necessary please crop out other objects)</Text>
            </View>
            <View style={styles.rowWrap}>
              <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{"4. "}</Text>
              <Text style={[styles.detailTxt, fonts.montserrat_regular]}>Like the following Images</Text>
            </View>
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
        </View>        
      </Modal>
    )
  }
}

export default helpComponent;