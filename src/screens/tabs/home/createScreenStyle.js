import { StyleSheet, Platform, Dimensions } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 30,
    backgroundColor: "#F9F9F9"    
  },
  img_container:{
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  imgWrap:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  uploadTxt_wrap:{
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: colorStyle.colorLightGray,
    borderRadius: 3
  },
  uploadTxt:{
    fontSize: responsiveFontSize(2),
    color: "white"
  },
  details_container:{
    marginTop: 15
  },
  detailsTxtWrap:{
    marginVertical: 10,
    fontSize: responsiveFontSize(2.3)
  },
  imgTypeTxt:{
    marginVertical: 10,
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  update_txt: {
    color: colorStyle.colorMainGray,
    fontSize: responsiveFontSize(2)
  },
  update_container: {
    height: responsiveHeight(8),
    marginTop: 40,
    marginBottom: 50,
    borderRadius: 7,
    backgroundColor: colorStyle.colorYellow,
    justifyContent: "center",
    alignItems: "center"
  },
})

module.exports = styles;