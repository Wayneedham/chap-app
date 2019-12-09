import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {shuffle} from "../../actions/userActions";
import Questions from "../../../config/question"
import styles from "./quizVideoScreenStyle";
import fonts from "../../sharedStyles/fontStyle";

class quizTextScreen extends Component{

  constructor(props) {
    super(props);
    const randomArr = shuffle(Questions.video_question);
    this.state = {
      isQuiz: true,
      isAnswer: false,
      question_index: 0,
      questionArr: randomArr
    };   
    console.log("randomArr===", randomArr);
  }

  goBack =()=>{
    Actions.pop();
  }

  onPrev(){
    const{question_index} = this.state;
    if(question_index>0){
      this.setState({question_index:(question_index - 1), isQuiz: true, isAnswer: false})
    }
  }

  onAnswer(){
    this.setState({isQuiz: false, isAnswer: true});
  }

  onNext(){
    const{question_index, questionArr} = this.state;
    if((question_index + 1)<questionArr.length){
      this.setState({question_index:(question_index + 1), isQuiz: true, isAnswer: false})
    }
  }

  render(){
    const{question_index, questionArr, isQuiz, isAnswer} = this.state;
    const quizItem = questionArr[question_index];
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
        <Text style={[styles.quizMsg, fonts.montserrat_semibold]}>{quizItem['question']}</Text>
        {
          isAnswer &&
          <Text style={[styles.answerMsg, fonts.montserrat_semibold]}>{quizItem['answer']}</Text>
        }
        <View style={[styles.answerBtnWrap, styles.answerTextBtn]}>
          {
            question_index!==0 ?
            (<TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onPrev()}>
              <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>Prev</Text>
            </TouchableOpacity>) : (
              <View style={{width: 40}}/>
            )
          }             
          {
            isQuiz &&
            <TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onAnswer()}>
              <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>Answer</Text>
            </TouchableOpacity>
          }  
          {
            question_index<(questionArr.length-1) ?
            (<TouchableOpacity style={styles.nextBtnView} onPress={()=>this.onNext()}>
              <Text style={[styles.nextBtnTxt, fonts.montserrat_semibold]}>Next</Text>
            </TouchableOpacity>) : (
              <View style={{width: 40}}/>
            )
          }            
          
        </View> 
      </View>
    )
  }
}

export default quizTextScreen;