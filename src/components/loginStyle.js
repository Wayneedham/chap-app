import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import colorStyle from "../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  input_container: {
    flex: 1,
    flexDirection: "column",
    marginTop: responsiveHeight(6)
  },
  signin_container: {
    height: responsiveHeight(8),
    borderRadius: 7,
    backgroundColor: colorStyle.colorYellow,
    justifyContent: "center",
    alignItems: "center"
  },
  signin_container_off: {
    height: responsiveHeight(8),
    borderRadius: 7,
    backgroundColor: colorStyle.colorLightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  signin_txt: {
    color: colorStyle.colorMainGray,
    fontSize: responsiveFontSize(2)
  },
  input_container_ortxt: {
    fontSize: responsiveFontSize(1.8),
    alignSelf: "center",
    color: "#B3B3B3",
    marginVertical: responsiveHeight(2)
  },
  social_wrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: responsiveHeight(18)
  },
  social_container: {
    height: responsiveHeight(8),
    width:"100%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F51B5"
  },
  socialIcon: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  social_txt: {
    fontSize: responsiveFontSize(2.4),
    color: "white"
  },
})

module.exports = styles;