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
  }
})

module.exports = styles;