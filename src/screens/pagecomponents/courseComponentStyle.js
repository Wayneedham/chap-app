import { StyleSheet} from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 30,
    backgroundColor: "#F9F9F9"
  },
  aboutTxt:{   
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  subscribeWrap:{
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30
  },
  subscribeBtn:{
    width: responsiveWidth(70),
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colorStyle.colorYellow
  },
  subscribeText:{
    fontSize: responsiveFontSize(2.5),
    color: colorStyle.colorMainGray
  },
  videoWrap:{
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  comeTxt:{
    fontSize: 27,
    paddingBottom: 100,
    color: colorStyle.colorMainGray
  }
})

module.exports = styles;