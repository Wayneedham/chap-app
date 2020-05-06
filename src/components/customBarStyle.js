import { StyleSheet } from "react-native";
import colorStyle from "../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  topbar_wrap:{
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  barTitle: {
    textAlign: "center",
    fontSize: 27,
    color: colorStyle.colorMainGray
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
    height: "100%"
  }
})

module.exports = styles;