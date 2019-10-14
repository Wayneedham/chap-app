import { StyleSheet, Platform, Dimensions } from "react-native";
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
    fontSize: responsiveFontSize(3.5),
    color: colorStyle.colorMainGray
  },
  camera_wrap:{
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 40,
    height: 40
  },
  camera:{
    width: "100%",
    height: "100%"
  }
})

module.exports = styles;