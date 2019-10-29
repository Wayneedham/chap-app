import { StyleSheet} from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../sharedStyles/colorStyle";

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
  dismissWrap: {
    position: "absolute",
    bottom: 5,
    right: -5
  },
  dismiss:{
    textAlign: "center",
    fontSize: responsiveFontSize(2.2),
    color: colorStyle.colorYellow,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  rowWrap:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3
  },
  detailTxt:{   
    fontSize: responsiveFontSize(2),
    color: colorStyle.colorMainGray
  },
  horseImg:{
    width: "100%",
    height: 150
  }
})

module.exports = styles;