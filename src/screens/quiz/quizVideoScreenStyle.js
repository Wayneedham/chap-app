import { StyleSheet } from "react-native";
import { responsiveWidth,
  responsiveFontSize,
  responsiveHeight
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 30,
  },
  topbar_wrap:{
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  back_wrap:{
    position: "absolute",    
    left: 0,
    bottom: 20,
    width: 20,
    height: 20
  },
  back:{
    width: "100%",    
    height: "100%",
    tintColor: 'white',
  },
  quizMsg:{
    fontSize: responsiveFontSize(2.7),
    paddingHorizontal: responsiveWidth(3),
    textAlign: 'center',
    color: 'white'
  },
  answerMsg:{
    fontSize: responsiveFontSize(3.7),
    paddingHorizontal: responsiveWidth(3),
    textAlign: 'center',
    color: 'green',
    marginTop: 30
  },
  watchMsg:{
    marginTop: 40,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: 'white'
  },
  quizImg:{
    width: '100%',
    height: '60%'
  },
  answerView:{
    alignItems: 'center'
  },  
  videoPlaywrap:{
    width: '80%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoPlayImgBtn:{
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: 10
  },
  answerImg:{
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  videoplayImg:{
    width: '100%',
    height: '100%'
  },
  answerBtnWrap:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  answerTextBtn:{
    marginTop: 50
  },
  nextBtnView:{
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3
  },
  nextBtnTxt:{
    fontSize: responsiveFontSize(2.2),
    color: 'black'
  }
})

module.exports = styles;