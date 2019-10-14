import { StyleSheet } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colorStyle from "../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container:{
    width: responsiveWidth(47),
    height: 180,
    marginBottom: 10,
    paddingHorizontal: 5,
    alignItems: "center"
  },
  horseImg:{
    height: "80%",
    width: "100%"
  }
})

module.exports = styles;
