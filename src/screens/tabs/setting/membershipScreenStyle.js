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
    flexDirection: "column",
    backgroundColor: "white"
  },
  aboutTxt:{   
    fontSize: 17,
    color: colorStyle.colorMainGray
  },
  subscribeWrap:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  subscribeBtn:{
    width: responsiveWidth(80),
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colorStyle.colorYellow
  },
  subscribeText:{
    fontSize: 23,
    color: colorStyle.colorMainGray
  }
})

module.exports = styles;