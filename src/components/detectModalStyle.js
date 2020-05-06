import { StyleSheet } from "react-native";
import { responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../sharedStyles/colorStyle";

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
  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(3.3),
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
    width: 20,
    height: 20
  },
  itemWrap:{
    paddingVertical: 5,
    flexDirection: "row"
  },
  itemTitle:{
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  imgWrap:{
    alignItems: "center"
  }
})

module.exports = styles;