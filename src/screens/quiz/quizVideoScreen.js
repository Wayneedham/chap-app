import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Dialog from "react-native-dialog";

import styles from "./quizVideoScreenStyle";
import fonts from "../../sharedStyles/fontStyle";
import { Actions } from 'react-native-router-flux';

class quizVideoScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isQuiz: true,
      isPromptDialog: false,
      horseAge: ""
    };   
  }

  goBack =()=>{
    Actions.pop();
  }

  onPrev(){

  }

  onNext(){
    
  }

  onAnswer(){
    this.setState({isPromptDialog: true});
  }

  onConfirm(){
    this.setState({isPromptDialog: false, isQuiz: false});
  }

  onVideoPlay(){

  }

  render(){
    const{isQuiz, isPromptDialog, horseAge} = this.state;
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
            <Text style={[styles.quizMsg, fonts.montserrat_semibold]}>How Old Do You Think this Horse is?</Text>
            <Image 
              style={styles.quizImg}
              resizeMode="contain"
              source={require("../../../assets/image/quiz/Horse_1.jpg")}
            />            
          </View>
          ) : (
            <View style={styles.answerView}>
              <Text style={[styles.quizMsg, fonts.montserrat_semibold]}>This Horse is 9 Years Old.</Text>  
              <Text style={[styles.watchMsg, fonts.montserrat_semibold]}>Watch Video</Text>            
              <View style={styles.videoPlaywrap}>
                <Image 
                  style={styles.answerImg}
                  resizeMode="cover"
                  source={require("../../../assets/image/quiz/Horse_1.jpg")}
                />  
                <TouchableOpacity style={styles.videoPlayImgBtn} onPress={()=>this.onVideoPlay()}>
                  <Image 
                    style={styles.videoplayImg}
                    resizeMode="contain"
                    source={require("../../../assets/icons/icon_videoplay.png")}
                  />  
                </TouchableOpacity>
              </View>              
            </View>
          )
        }
          <View style={styles.answerBtnWrap}>
            <TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onPrev()}>
              <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>Prev</Text>
            </TouchableOpacity>
            {
              isQuiz &&
              <TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onAnswer()}>
                <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>Answer</Text>
              </TouchableOpacity>
            }            
            <TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onNext()}>
              <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>Next</Text>
            </TouchableOpacity>
          </View>  
        </View>

        <Dialog.Container visible={isPromptDialog}>          
          <Dialog.Description>            
            <Text style={fonts.montserrat_bold}> How Old Do You Think This Horse is ? </Text>
          </Dialog.Description>
          <Dialog.Input 
            placeholder={"Enter Horse's Age"}
            value={horseAge}
            keyboardType={'decimal-pad'}
            returnKeyType={'done'}
            onChangeText={txt => this.setState({ horseAge: txt })}
          />
          <Dialog.Button label="Ok" onPress={()=>this.onConfirm()}/>
        </Dialog.Container>
      </View>
    )
  }
}

export default quizVideoScreen;