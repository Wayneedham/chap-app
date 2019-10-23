import { StyleSheet } from "react-native";
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
  search_wrap:{
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 10
  },
  searchIcon:{
    width: 20,
    marginRight: 5
  }
})

module.exports = styles;