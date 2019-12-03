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
  barTitle: {
    textAlign: "center",
    fontSize: 27,
    color: colorStyle.colorMainGray
  },
  back_wrap:{
    position: "absolute",
    left: 0,
    bottom: 20,
    width: 20,
    height: 20
  },
  back:{
    width: "100%",
    height: "100%"
  },
  unsubscribe_wrap:{
    position: "absolute",
    right: 0,
    bottom: 20
  },
  unsubscribe_txt: {
    color: colorStyle.colorMainGray,
    fontSize: 12
  },
  update_txt: {
    color: colorStyle.colorMainGray,
    fontSize: 24
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