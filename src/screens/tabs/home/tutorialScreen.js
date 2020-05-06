import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import VideoPlayer from 'react-native-video-controls';

import CustomBar from "../../../components/customBar";
import serverurl from '../../../../config/const/serverurl';
import styles from "./tutorialScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";
import { Actions } from 'react-native-router-flux';

class tutorialScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false
    };   
  }
  
  onVideoPlay =()=>{
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
    Actions.videoPlayScreen({video_url: serverurl.tutorial_video});
  }

  onDismiss(){
    this.setState({isShowModal: false});
    Orientation.lockToPortrait();
  }

  render(){
    const{isShowModal} = this.state;
    return(
      <ScrollView style={styles.container}>
        <CustomBar 
          title={this.props.intlData.messages['home']['tutorial']}
          navigate={this.props.navigation}
        />
        <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{this.props.intlData.messages['home']['watchTutorial']}</Text>
        <TouchableOpacity style={styles.videoPlayWrap} onPress={()=>this.onVideoPlay()}>
          <Image 
            style={styles.videoPlayImg}
            resizeMode="contain"
            source={require("../../../../assets/icons/icon_videoplay.png")}
          />
        </TouchableOpacity> 
        <View style={styles.txtContainer}>
          {
            this.props.intlData.messages['home'].tutorialList1.map((title,index)=>(
              <View style={styles.rowWrap} key={index}>
                <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{(index+1) + ". "}</Text>
                <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{title}</Text>
              </View>
            ))
          }
        </View>
        <View>
          <Image 
            source={require("../../../../assets/image/horse_1.jpg")}
            resizeMode={"contain"}
            style={[styles.horseImg, {marginTop: 20}]}
          />         
          <Image 
            source={require("../../../../assets/image/horse_2.jpg")}
            resizeMode={"contain"}
            style={[styles.horseImg, {marginVertical: 40}]}
          />
        </View>
        <View style={styles.txtContainer}>
          {
            this.props.intlData.messages['home'].tutorialList2.map((title,index)=>(
              <View style={styles.rowWrap} key={index}>
                <Text style={[styles.detailTxt, fonts.montserrat_semibold]}>{(index+5) + ". "}</Text>
                <Text style={[styles.detailTxt, fonts.montserrat_regular]}>{title}</Text>
              </View>
            ))
          }           
        </View>        
        <Modal
          animationType="slide"
          transparent={false}
          visible={isShowModal}
          onRequestClose={()=>{}}>
          <VideoPlayer
            source={{ uri: serverurl.tutorial_video }}
            onBack={()=>this.onDismiss()}
          />
        </Modal>
        <View style={{height: 100}}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  connection: state.connection.isConnected,
  intlData: state.IntlReducers
})

export default connect(
  mapStateToProps,
  null
)(tutorialScreen);