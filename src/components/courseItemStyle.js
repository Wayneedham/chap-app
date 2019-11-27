import { StyleSheet } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  courseWrap:{
    height: "50%",
    width: "100%",
    paddingVertical: 10
  },
  courseTitleTxt:{
    fontSize: responsiveFontSize(3),
    color: colorStyle.colorMainGray
  },
  courseDetailTxt:{
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  subscribeWrap:{
    flex: 1,
    height: "100%",
    alignItems: 'center'
  },
  videoPlayImg:{
    height: "80%"
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