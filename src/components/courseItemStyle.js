import { StyleSheet } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  courseWrap:{
    height: "50%",
    paddingVertical: 10
  },
  courseTitleWrap:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDetailTxt:{
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  quizBtn:{
    backgroundColor: colorStyle.colorGreen,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4
  },
  quizTxt:{
    fontSize: responsiveFontSize(1.8),    
  },
  subscribeWrap:{
    alignItems: 'center',
    justifyContent: 'center',
    height: "80%"
  },
  videoPlayImg:{
    height: "90%"
  },
  subscribeBtn:{
    width: responsiveWidth(70),
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colorStyle.colorYellow
  },
  subscribeText:{
    fontSize: responsiveFontSize(3),
    color: colorStyle.colorMainGray
  }
})

module.exports = styles;