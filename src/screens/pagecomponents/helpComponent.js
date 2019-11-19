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

const tutorialList1 = [
  "Clear, not Blurry",
  "Straight on, not at an angle.",
  "Contain all Lower Teeth, with minimal other objects in the photo. (If necessary please crop out other objects)",
  "Like the following Images"
]

const tutorialList2 = [
  "Program can only detect up to 17 Yesrs Old by using the Lower Image.",
  "Program can only detect up to 20 Yesrs Old by using the Upper Image.",
  "User will receive a 3 Year Range from CHAP Within the minute, and will receive a 2 Year and 1 Year estimation from our Experts within 24 hours. Our experts will be able to give an Estimation higher than 20 Years Old.",
  "To understand this Process and Learn for yourself, Please subscribe to our Instructional Video Course."
]

class helpComponent extends Component{
  render(){
    const{isShow} = this.props;
    return(
      <Modal
        animationType={'slide'}      
        visible={isShow}
        onRequestClose={()=>{}}>
        <ScrollView style={styles.container}>
          <View style={styles.topbar_wrap}>
            <Text style={[styles.title, fonts.montserrat_bold]}>Image Type</Text>
            <TouchableOpacity style={styles.dismissWrap} onPress={this.props.onDone}>
              <Text style={[styles.dismiss, fonts.montserrat_bold]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.txtContainer}>
            {
              tutorialList1.map((title,index)=>(
                <View style={styles.rowWrap}>
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
              tutorialList2.map((title,index)=>(
                <View style={styles.rowWrap}>
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

export default helpComponent;