import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VideoPlayer from 'react-native-video-controls';

import * as userActions from "../../actions/userActions";
import {getDataError, getDataSuccess, getDataPending} from '../../reducers/fetchdata';

import ProgressBar from "../../components/progressBar";
import CourseItem from "../../components/courseItem"; 
import serverurl from '../../../config/const/serverurl';
import styles from "./courseComponentStyle";
import fonts from "../../sharedStyles/fontStyle";
import stripe, {optionsCardForm} from '../../../config/stripe';
import { Actions } from 'react-native-router-flux';


class courseComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isPending: false,
      videoURL: ""
    };   
  }

 componentWillReceiveProps(nextProps){
    if(nextProps.pending === false){
      const responseData = nextProps.data;
      if(nextProps.isactive === 0 || nextProps.isactive === 1){
        if(Object.keys(responseData).includes("message")){
          console.log(responseData)
          console.log("purchase error")
        }
        else if(Object.keys(responseData).includes("id")){
          window.currentUser = responseData;
          userActions._storeData("userInfo", responseData);
        }
        this.setState({isPending: false});
      }
    }
  }

  onProcessPayment (token){
    const userData = new FormData()
    console.log(window.currentUser["id"])
    userData.append('user', window.currentUser["id"]);
    userData.append('token', token);
    userData.append('type', "video");
    this.props.actions.videoPurchase(userData);
  }

  onSubScribe =()=>{
    stripe
    .paymentRequestWithCardForm(optionsCardForm)
    .then(token => {
      console.log(token)
      if(token)
        this.onProcessPayment(token.tokenId);
        this.setState({ isPending: true });
    })
    .catch(error => {
      console.warn("Payment failed", { error });
    });
  }

  onVideoPlay =(url)=>{
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
    Actions.videoPlayScreen({video_url: url});
    // this.setState({videoURL: url, isShowModal: true})
  }

  onQuiz =(index)=>{
    if(index === 1){
      Actions.quizVideoScreen();
    }else{
      Actions.quizTextScreen();
    }
  }

  onDismiss(){
    this.setState({isShowModal: false});
  }
  
  render(){
    const isPurchase = window.currentUser["is_video"];
    const{isShowModal, videoURL, isPending} = this.state;
    const { intlData } = this.props
    return(
      <View style={styles.container}>
        {/* <View style={styles.videoWrap}>
          <Text style={[styles.comeTxt, fonts.montserrat_semibold]}>Coming Soon....</Text>
        </View> */}
        {
          isPurchase === false ? (
            <ScrollView>
              <View style={styles.subscribeWrap}>
                <Image 
                  style={styles.playThumbnailImg}
                  resizeMode="cover"
                  source={require("../../../assets/image/course_1.jpeg")}
                />
                <TouchableOpacity style={styles.videoPlayWrap} onPress={()=>this.onVideoPlay(serverurl.course_video_3)}>
                  <Image 
                    style={styles.videoPlayImg}
                    resizeMode="contain"
                    source={require("../../../assets/icons/icon_videoplay.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.aboutTxt, fonts.montserrat_regular]}>
                {intlData.messages['page'].courseComponent.join('\n')}
              </Text>
              <View style={styles.subscribeWrap}>
                <TouchableOpacity style={styles.subscribeBtn} onPress={()=>this.onSubScribe()}>
                <Text style={[styles.subscribeText, fonts.montserrat_semibold]}>
                  {this.props.intlData.messages['page']['buyNow']}
                </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <View>
              <CourseItem
                title={this.props.intlData.messages['videos']['courseVideo1Title']}
                onVideoPlay={this.onVideoPlay}
                onQuiz ={this.onQuiz}
                index={0}
                URL={serverurl.course_video_1}
              />
              <CourseItem
                title={this.props.intlData.messages['videos']['courseVideo2Title']}
                onVideoPlay={this.onVideoPlay}
                onQuiz ={this.onQuiz}
                index={1}
                URL={serverurl.course_video_2}
              /> 
            </View>
          )
        }
        <ProgressBar 
          isPending={isPending}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={isShowModal}
          onRequestClose={()=>{}}>
          <VideoPlayer
            source={{ uri: videoURL }}
            onBack={()=>this.onDismiss()}
          />
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  error: getDataError(state.fetchdata),
  data: getDataSuccess(state.fetchdata),
  isactive: state.fetchdata.isactive,
  connection: state.connection.isConnected,
  pending: getDataPending(state.fetchdata),
  intlData: state.IntlReducers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      videoPurchase: userActions.videoPurchase,
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(courseComponent);