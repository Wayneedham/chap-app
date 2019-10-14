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
  back_wrap:{
    position: "absolute",
    left: 0,
    bottom: 5,
    width: 15,
    height: 15
  },
  back:{
    width: "100%",
    height: "100%"
  },
  detail_wrap:{
    marginTop: 20
  },
  detail_txt_wrap:{
    marginTop: 10
  },
  detail_bold_txt:{
    fontSize: 15,
    lineHeight: 20
  }
})


module.exports = styles;