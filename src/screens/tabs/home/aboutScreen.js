import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

import CustomBar from "../../../components/customBar";
import styles from "./aboutScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class aboutScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <CustomBar 
          title={"About"}
          navigate={this.props.navigation}
        />
        <ScrollView>        
          <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
            CHAP stands for Computerized Horse Aging Program. At CHAP, our goal is to educate horse owners about their horses’ teeth. The more knowledge and understanding we can acquire, the better owners and companions we can be. The science behind aging horses and the functionality of their teeth is a must-learn for every great horseman.
            {"\n"}Our in-depth video course has not only taught hundreds of aspiring equine dentists and veterinarians to age horses, but we also use that knowledge along with artificial intelligence and computer vision to train our computer model to age horses. To train this model, we had the computer analyze 18 features on the upper incisors and 18 features on the lower incisors on more than 1000 images, over 36,000 points of data.
            {"\n"}{"\n"}We want to be your horse aging service. With each submission, you will receive an estimation from our computer model within the minute, usually 10-15 seconds. Because we are a service-oriented company, you will also receive an estimation from our expert staff within 24 hours of submission, verifying the estimation given by CHAP. This means you will get 2 unbiased opinions of your horse’s age.
            {"\n"}If you are not convinced of our adeptness, watch the course videos. If you can help us improve our aging accuracy or aging expertise, we will refund your course money as well as give you unlimited access to our aging model for free for a year, $339 value!
            {"\n"}{"\n"}Aging horses by dentition is our passion; we hope you will share in that passion.
            {"\n"}I was also wondering if we needed to put 2 buttons on the upload page. I button that said ‘Example of Picture Needed for Lower’ and the other button saying ‘Example of Picture needed for Lowers’. They would link to a page that showed a picture like this for the Lowers
          </Text>
          <Image 
            source={require("../../../../assets/image/horse_1.jpg")}
            resizeMode={"contain"}
            style={styles.horseImg}
          />
          <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
            And the ‘Example of Picture needed for the Uppers’ would link to a picture that looked like this
          </Text>
          <Image 
            source={require("../../../../assets/image/horse_2.jpg")}
            resizeMode={"contain"}
            style={[styles.horseImg, {marginBottom: 100}]}
          />
        </ScrollView>
      </View>
      
    )
  }
}

export default aboutScreen;