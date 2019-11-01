import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {
  responsiveWidth
} from 'react-native-responsive-dimensions';

import styles from "./detectModalStyle";
import fonts from "../sharedStyles/fontStyle";

class detectModal extends Component{

  constructor(props){
    super(props);
    this.state = {
      calcImgHeight: 0
    }
  }

  render(){
    const{isRecent, recentData} = this.props;
    let age = "";
    if(recentData !== undefined && recentData !== ""){
      age = recentData.age === null ? 0 : recentData.age;
      if(recentData.image_type.toLowerCase() === "lower"){
        age = parseFloat(age) >= 17 ? "17 or Older" : age;
      }else{
        age = parseFloat(age) >= 20 ? "20 or Older" : age;
      }
    }    

    const {calcImgHeight} = this.state;
    return(
      <Modal 
        animationType={'slide'}      
        visible={isRecent}
        onRequestClose={()=>{}}>
        <View style={styles.container}>
          <View style={styles.topbar_wrap}>
            <Text style={[styles.title, fonts.montserrat_bold]}>Detect Result</Text>
            <TouchableOpacity style={styles.dismissWrap} onPress={this.props.onDone}>
              <Text style={[styles.dismiss, fonts.montserrat_bold]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemWrap}>
            <Text style={[styles.itemTitle, fonts.montserrat_bold]}>
              {"Image Type:  "}
            </Text>
            <Text style={[styles.itemTitle, fonts.montserrat_medium]}>{recentData["image_type"]}</Text>
          </View>
          <View style={styles.itemWrap}>
            <Text style={[styles.itemTitle, fonts.montserrat_bold]}>
              {"Detected Age:  "}
            </Text>
            <Text style={[styles.itemTitle, fonts.montserrat_medium]}>{age}</Text>
          </View>
          <View style={styles.imgWrap}>
            <FastImage 
              resizeMode="contain"
              style={{ width: responsiveWidth(94), height: calcImgHeight }}
              source={{ uri: recentData.file }}
              onLoad={evt =>
                this.setState({
                  calcImgHeight:
                    evt.nativeEvent.height / evt.nativeEvent.width * responsiveWidth(94), // By this, you keep the image ratio
                })}
            />
          </View>
        </View>        
      </Modal>
    )
  }
}

export default detectModal;