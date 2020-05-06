import { StyleSheet } from "react-native";
import { responsiveWidth
} from 'react-native-responsive-dimensions';
import colorStyle from "../../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3),
    paddingTop: 30,
    backgroundColor: "#F9F9F9"
  },
  detail_wrap:{
    marginTop: 20
  },
  detail_txt_wrap:{
    marginTop: 10,
    marginBottom: 80
  },
  detail_bold_txt:{
    fontSize: 15,
    lineHeight: 20
  },
  modal_container:{
    flex: 1,
    backgroundColor: "black"
  },
  dismissWrap: {
    position: "absolute",
    padding: 3,
    top: 15,
    right: 5
  },
  dismiss:{
    textAlign: "center",
    fontSize: 25,
    color: colorStyle.colorYellow,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})


module.exports = styles;