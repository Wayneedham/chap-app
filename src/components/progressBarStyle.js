import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  progressWrap:{
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingBottom: responsiveHeight(3),
    backgroundColor: "transparent",
    zIndex: 100
  },
  loadingTxtWrap:{
    width: responsiveWidth(100),
    marginBottom: responsiveHeight(3), 
    alignItems: 'center',
    backgroundColor: 'white'
  },
  loadingTxt:{
    color: 'red',
    fontSize: responsiveFontSize(2)
  }
})

module.exports = styles;