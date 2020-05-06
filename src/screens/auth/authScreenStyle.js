import { StyleSheet, Platform, Dimensions } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(7),
    flexDirection: "column",
    backgroundColor: "white"
  },
  register_container:{
    paddingHorizontal: responsiveWidth(7),
    flexDirection: "column",
    backgroundColor: "white"
  },
  showpwd_icon_wrap:{
    position: "absolute",
    right: 0,
    bottom: 20,
    width: 21,
    height: 21
  },
  txt_title: {
    fontSize: responsiveFontSize(3.5),
    color: "#232E40",
    marginTop: responsiveHeight(15),
    marginBottom: responsiveHeight(3)
  },
  already_txt_register_container: {
    flexDirection: "row",
    position: 'absolute',
    top: responsiveHeight(8),
    alignSelf: "center"
  },
  already_txt_container: {
    flexDirection: "row",
    position: 'absolute',
    top: responsiveHeight(8),
    alignSelf: "center"
  },
  already_txt: {
    color: "#585F6F",
    fontSize: responsiveFontSize(1.8)
  },
  already_txt_underline:{
    color: "#585F6F",
    fontSize: responsiveFontSize(2)
  }
})

module.exports = styles;