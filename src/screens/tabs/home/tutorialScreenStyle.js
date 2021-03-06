import { StyleSheet} from "react-native";
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
  topbar_wrap:{
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  txtContainer:{
    marginTop: 10,
    width: responsiveWidth(85)
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: colorStyle.colorMainGray
  },
  dismissWrap: {
    position: "absolute",
    bottom: 5,
    right: -5
  },
  dismiss:{
    textAlign: "center",
    fontSize: 20,
    color: colorStyle.colorYellow,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  rowWrap:{
    flexDirection: "row",
    marginBottom: 3
  },
  detailTxt:{   
    fontSize: 18,
    color: colorStyle.colorMainGray
  },
  subscribeWrap:{
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playThumbnailImg:{
    position: 'absolute',
    height: "100%",
    width: "100%",
  },
  horseImg:{
    width: "100%",
    height: 150
  },
  videoPlayWrap:{
    height: 200, 
    alignItems: 'center'
  },
  videoPlayImg:{
    height: "100%"
  },
})

module.exports = styles;