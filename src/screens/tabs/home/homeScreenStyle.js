import { StyleSheet } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
    alignItems: "center",
    backgroundColor: "#F9F9F9"
  },
  logo_container:{
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: "center"
  },
  bigTxt:{
    color: colorStyle.colorMainGray,
    fontSize: 35
  },
  logo_img:{
    height: 120
  },
  buttonWrap:{
    backgroundColor: "#00A74C",
    width: responsiveWidth(85),
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginBottom: 10
  },
  buttonText:{
    fontSize: 35,
    color: "black"
  },

  aboutbtnWrap:{
    backgroundColor: "black",
    width: responsiveWidth(65),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginBottom: 10
  },
  aboutTxt:{
    fontSize: 25,
    color: "#00A74C"
  },
  helpWrap:{
    position: "absolute",
    bottom: 30,
    left: 0,
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: "center"
  },
  moreTxt:{
    fontSize: responsiveFontSize(1.4),
    color: colorStyle.colorMainGray,
  },
  webTxt:{
    fontSize: responsiveFontSize(1.4),
    color: "green",
    textDecorationLine: "underline"
  }
})

module.exports = styles;