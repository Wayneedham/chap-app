import { StyleSheet } from "react-native";
import { responsiveWidth,
  responsiveFontSize,
  responsiveHeight
} from 'react-native-responsive-dimensions';
import colorStyle from "../../sharedStyles/colorStyle";

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
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginBottom: 5,
    color: 'white'
  },
  quizImgWrap:{
    width: '100%',
    height: '60%'
  },
  quizImg:{
    width: '100%',
    height: '100%'
  },
  answerView:{
    alignItems: 'center'
  },  
  videoPlaywrap:{
    width: '80%',
    height: '50%',
    marginBottom: 40,
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
  },
  modal_container:{
    flex: 1,
    backgroundColor: "black"
  },
  dismissWrap: {
    position: "absolute",
    padding: 3,
    top: 15,
    right: 5
  },
  dismiss:{
    textAlign: "center",
    fontSize: 25,
    color: colorStyle.colorYellow,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})

module.exports = styles;