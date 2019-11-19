import { StyleSheet } from "react-native";
import { responsiveHeight,
} from 'react-native-responsive-dimensions';
import colorStyle from "../sharedStyles/colorStyle";

const styles = StyleSheet.create({
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
  }
})

module.exports = styles;