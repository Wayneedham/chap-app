import { StyleSheet } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: "column",
    backgroundColor: "#F9F9F9"
  },
  title:{
    textAlign: "center",
    fontSize: 27,
    color: colorStyle.colorMainGray,
    lineHeight: 70,
    height: 70,
    width: "100%"
  },
  item_wrap:{
    paddingHorizontal: 20,
    justifyContent: "center",
    height: 50,
    width: "100%",
    backgroundColor: 'white',
    borderBottomColor: "#D2D4D8",
    borderBottomWidth: 1
  },
  item_wrap_top_border:{
    borderTopColor: "#D2D4D8",
    borderTopWidth: 1
  },
  item_wrap_txt:{
    fontSize: 16,
    color: colorStyle.colorMainGray,
  },
})

module.exports = styles;