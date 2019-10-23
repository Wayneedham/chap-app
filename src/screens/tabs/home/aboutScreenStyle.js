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
  scroll_container:{
    alignItems: "center"
  },
  aboutTxt:{   
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  horseImg:{
    width: "100%",
    height: 180
  }
})

module.exports = styles;