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
    marginTop: responsiveHeight(12),
    marginBottom: responsiveHeight(3)
  },
  already_txt_register_container: {
    flexDirection: "row",
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(5),
    alignSelf: "center"
  },
  already_txt_container: {
    flexDirection: "row",
    position: 'absolute',
    bottom: responsiveHeight(5),
    alignSelf: "center"
  },
  already_txt: {
    color: "#585F6F",
    fontSize: responsiveFontSize(1.8)
  },
})

module.exports = styles;