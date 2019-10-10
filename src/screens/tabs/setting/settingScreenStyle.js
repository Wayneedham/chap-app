import { StyleSheet, Platform, Dimensions } from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(7),
    flexDirection: "column",
    backgroundColor: "green"
  },
})

module.exports = styles;