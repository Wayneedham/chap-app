import { StyleSheet, Platform, Dimensions } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';

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
    marginTop: 10
  },
  detail_bold_txt:{
    fontSize: 15,
    lineHeight: 20
  }
})


module.exports = styles;