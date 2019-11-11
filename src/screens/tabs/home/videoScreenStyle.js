import { StyleSheet } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 30,
    backgroundColor: "#F9F9F9"
  },
  topbar_wrap:{
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title:{
    textAlign: "center",
    fontSize: 32,
    color: colorStyle.colorMainGray
  },
  course_container:{
    flex: 1,
  },
  courseWrap:{
    height: "50%",
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
    alignItems: "center",
    justifyContent: "center"
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