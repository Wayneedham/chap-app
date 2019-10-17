import { StyleSheet } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 30,
    flexDirection: "column",
    backgroundColor: "white"
  },
  topbar_wrap:{
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(3.5),
    color: colorStyle.colorMainGray
  },
  back_wrap:{
    position: "absolute",
    left: 0,
    bottom: 20,
    width: 15,
    height: 15
  },
  back:{
    width: "100%",
    height: "100%"
  },
  update_txt: {
    color: colorStyle.colorMainGray,
    fontSize: responsiveFontSize(2)
  },
  update_container: {
    height: responsiveHeight(8),
    marginTop: 40,
    borderRadius: 7,
    backgroundColor: colorStyle.colorYellow,
    justifyContent: "center",
    alignItems: "center"
  },
})

module.exports = styles;