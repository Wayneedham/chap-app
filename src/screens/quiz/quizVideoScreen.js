import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  Alert,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import Dialog from "react-native-dialog";
import { Actions } from 'react-native-router-flux';
import {
  responsiveWidth, responsiveHeight
} from 'react-native-responsive-dimensions';
import ImageZoom from 'react-native-image-pan-zoom';

import {shuffle} from "../../actions/userActions";
import styles from "./quizVideoScreenStyle";
import fonts from "../../sharedStyles/fontStyle";

const answerList = [
  "9", "14", "8~9", "3", "11~12", "19~20", "8~9", "16~18",
  "4", "15", "25", "6", "16", "2", "13", "9", "17", "5",
  "11~14", "32", "10", "11"
]

const vimeoVideoIDs = [
  379617660, 379617750, 379617810, 379617906,
  379632723, 379632883, 379633155, 379632960,
  379633202, 379633291, 379633365, 379633432,
  379633499, 379633549, 379633663, 379634015,
  379634169, 379634202, 379634319, 379634374,
  379634434, 379634477
];

const quizImgList = [
  require("../../../assets/image/quiz/Horse_1.jpg"),
  require("../../../assets/image/quiz/Horse_2.jpg"),
  require("../../../assets/image/quiz/Horse_3.jpg"),
  require("../../../assets/image/quiz/Horse_4.jpg"),
  require("../../../assets/image/quiz/Horse_5.jpg"),
  require("../../../assets/image/quiz/Horse_6.jpg"),
  require("../../../assets/image/quiz/Horse_7.jpg"),
  require("../../../assets/image/quiz/Horse_8.jpg"),
  require("../../../assets/image/quiz/Horse_9.jpg"),
  require("../../../assets/image/quiz/Horse_10.jpg"),
  require("../../../assets/image/quiz/Horse_11.jpg"),
  require("../../../assets/image/quiz/Horse_12.jpg"),
  require("../../../assets/image/quiz/Horse_13.jpg"),
  require("../../../assets/image/quiz/Horse_14.jpg"),
  require("../../../assets/image/quiz/Horse_15.jpg"),
  require("../../../assets/image/quiz/Horse_16.jpg"),
  require("../../../assets/image/quiz/Horse_17.jpg"),
  require("../../../assets/image/quiz/Horse_18.jpg"),
  require("../../../assets/image/quiz/Horse_19.jpg"),
  require("../../../assets/image/quiz/Horse_20.jpg"),
  require("../../../assets/image/quiz/Horse_21.jpg"),
  require("../../../assets/image/quiz/Horse_22.jpg")
]

class quizVideoScreen extends Component{
  constructor(props) {
    super(props);
    var list = [];
    const lowEnd = 1, highEnd = 22;
    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    const randomArr = shuffle(list);
    this.state = {
      isQuiz: true,
      isPromptDialog: false,
      horseAge: "",
      question_index: 0,
      sortArr: randomArr,
      zoomModal: false
    };
  }

  goBack =()=>{
    Actions.pop();
  }

  onPrev(){
    const{question_index} = this.state;
    if(question_index > 0){
      this.setState({question_index:(question_index - 1), isQuiz: true, horseAge: ""})
    }
  }

  onNext(){
    const{question_index} = this.state;
    if((question_index + 1) < answerList.length){
      this.setState({question_index:(question_index + 1), isQuiz: true, horseAge: ""})
    }
  }

  onAnswer(){
    this.setState({isPromptDialog: true});
  }

  onConfirm(){
    this.setState({isPromptDialog: false, isQuiz: false});
  }

  onVideoPlay(){
    const{question_index, sortArr} = this.state;
    const orderNum = sortArr[question_index];
    const quizVimeoVideoID = vimeoVideoIDs[orderNum-1]; //"https://ml-ref-data.s3.us-east-2.amazonaws.com/QA/" + orderNum + ".mp4";
    if(!this.props.connection){
      Alert.alert(
        "",
        this.props.intlData.messages['auth']['checkNetwork']
      );
      return;
    }
    Actions.videoPlayScreen({video_url: quizVimeoVideoID});
  }

  onZoomImage =(flag)=>{
    this.setState({zoomModal: flag})
  }

  render(){
    const{isQuiz, isPromptDialog, horseAge, question_index, sortArr, zoomModal} = this.state;  
    const orderNum = sortArr[question_index];
    const rightAnswerAge = answerList[orderNum-1];
    const quizImgURL = quizImgList[orderNum-1];
    const { intlData } = this.props;

    return(
      <View style={styles.container}>
        <View style={styles.topbar_wrap}>
          <TouchableOpacity style={styles.back_wrap} onPress={this.goBack}>
            <Image
              source={require("../../../assets/icons/icon_back_white.png")}
              style={styles.back}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
        {
          isQuiz ? (
          <View>
            <Text style={[styles.quizMsg, fonts.montserrat_semibold]}>{intlData.messages['detection']['horseAgeOld']}</Text>
            <TouchableOpacity style={styles.quizImgWrap} onPress={()=>this.onZoomImage(true)}>
              <Image
                style={styles.quizImg}
                resizeMode="contain"
                source={quizImgURL}
              />
            </TouchableOpacity>
          </View>
          ) : (
            <View style={styles.answerView}>
              <Text style={[styles.watchMsg, fonts.montserrat_semibold]}>
                {intlData.messages['quiz']['watchVideo']}
              </Text>
              <View style={styles.videoPlaywrap}>
                <Image 
                  style={styles.answerImg}
                  resizeMode="cover"
                  source={quizImgURL}
                />  
                <TouchableOpacity style={styles.videoPlayImgBtn} onPress={()=>this.onVideoPlay()}>
                  <Image 
                    style={styles.videoplayImg}
                    resizeMode="contain"
                    source={require("../../../assets/icons/icon_videoplay.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.quizMsg, fonts.montserrat_semibold]}>{"This Horse is " + rightAnswerAge+" Years Old."}</Text>          
            </View>
          )
        }
          <View style={styles.answerBtnWrap}>
            {
              question_index!==0 ? 
              (<TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onPrev()}>
              <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>{intlData.messages['quiz']['prev']}</Text>
              </TouchableOpacity>) : (
                <View style={{width: 40}}/>
              )
            }
            {
              isQuiz &&
              <TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onAnswer()}>
                <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>{intlData.messages['quiz']['answer']}</Text>
              </TouchableOpacity>
            }
            {
              question_index<(quizImgList.length-1) ?
              (<TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onNext()}>
                <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>{intlData.messages['quiz']['next']}</Text>
              </TouchableOpacity>) : (
                <View style={{width: 40}}/>
              )
            }
            
          </View>
        </View>

        <Dialog.Container visible={isPromptDialog}>
          <Dialog.Description>
            <Text style={fonts.montserrat_bold}> {intlData.messages['detection']['horseAgeOld']} </Text>
          </Dialog.Description>
          <Dialog.Input
            placeholder={intlData.messages['quiz']['enterHorseAge']}
            value={horseAge}
            keyboardType={'decimal-pad'}
            returnKeyType={'done'}
            onChangeText={txt => this.setState({ horseAge: txt })}
          />
          <Dialog.Button label="Ok" onPress={()=>this.onConfirm()}/>
        </Dialog.Container>

        <Modal
          animationType={'slide'}
          visible={zoomModal}
          onRequestClose={()=>{}}>
            <View style={styles.modal_container}>
              <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={responsiveWidth(100)}
                        imageHeight={responsiveHeight(100)}>
                <Image
                  style={{width:responsiveWidth(100), height:responsiveHeight(100)}}
                  source={quizImgURL}
                  resizeMode="contain"
                  />
              </ImageZoom>
              <TouchableOpacity style={styles.dismissWrap} onPress={()=>this.onZoomImage(false)}>
                <Text style={[styles.dismiss, fonts.montserrat_bold]}>Close</Text>
              </TouchableOpacity>
            </View>
        </Modal>
      </View>
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
)(quizVideoScreen);