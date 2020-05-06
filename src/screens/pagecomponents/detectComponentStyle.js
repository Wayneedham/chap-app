import { StyleSheet} from "react-native";
import { responsiveHeight,
         responsiveWidth,
         responsiveFontSize
} from 'react-native-responsive-dimensions';
import colorStyle from "../../sharedStyles/colorStyle";

const styles = StyleSheet.create({
  img_container:{
    width: "100%",
    height: responsiveHeight(28),
    alignItems: "center",
    justifyContent: "center"
  },
  imgWrap:{
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  uploadTxt_wrap:{
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: colorStyle.colorLightGray,
    borderRadius: 3
  },
  uploadTxt:{
    fontSize: 18,
    color: "white"
  },
  details_container:{
    marginTop: 15
  },
  detailsTxtWrap:{
    marginVertical: 10,
    fontSize: 18
  },
  rowWrap:{
    flexDirection: "row",
    alignItems: "center"
  },
  helpWrap:{
    marginLeft: 10
  },
  helpIcon:{
    width: 20,
    height: 20
  },
  helpTxt:{
    fontSize: 16,
    color: 'red',
    paddingLeft: 12,
    paddingTop: 2
  },
  imgTypeTxt:{
    marginVertical: 10,
    fontSize: 17,
    color: colorStyle.colorMainGray
  },
  update_txt: {
    color: colorStyle.colorMainGray,
    fontSize: 18
  },
  update_small_txt:{
    fontSize: 14,
    marginTop: 3
  },
  update_container: {
    height: responsiveHeight(8),
    marginTop: 40,
    borderRadius: 7,
    backgroundColor: colorStyle.colorYellow,
    justifyContent: "center",
    alignItems: "center"
  },
  upgrade_container: {
    height: responsiveHeight(8),
    marginTop: 20,
    marginBottom: 80,
    borderRadius: 7,
    backgroundColor: colorStyle.colorYellow,
    justifyContent: "center",
    alignItems: "center"
  }
})

module.exports = styles;