import { StyleSheet, Platform } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colorStyle from "./colorStyle";

const shareStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  topbar_container: {
    height: Platform.OS === "ios" ? responsiveHeight(12) : responsiveHeight(10),
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 10
  },
  topbar_txt: {
    color: colorStyle.colorMainGray,
    fontSize: responsiveFontSize(2.1),
    letterSpacing: -0.41
  }
});

module.exports = shareStyles;
