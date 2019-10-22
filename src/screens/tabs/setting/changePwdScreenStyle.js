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
  }
})

module.exports = styles;