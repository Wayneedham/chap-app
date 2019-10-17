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
    fontSize: responsiveFontSize(3.5),
    color: colorStyle.colorMainGray,
    lineHeight: 70,    
    height: 70,
    width: "100%"
  },
  pro: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFCF1B",
    borderRadius: 5,
    height: 24,
    paddingHorizontal: 8.5,
    paddingVertical: 3,
    width: responsiveWidth(20)
  },
  proText: {
    color: colorStyle.colorMainGray,
    fontSize: responsiveFontSize(1.6),
    textAlign: "center"
  },
  free: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B3B3B3",
    borderRadius: 5,
    height: 24,
    paddingHorizontal: 8.5,
    paddingVertical: 3,
    width: responsiveWidth(20)
  },
  freeText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(1.6),
    textAlign: "center"
  },
  row_wrap:{
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: "100%",
    backgroundColor: 'white',
    borderBottomColor: "#D2D4D8",
    borderBottomWidth: 1
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
    fontSize: responsiveFontSize(1.9),
    color: colorStyle.colorMainGray,    
  },
  log_out_wrap:{
    marginTop: 50,
    alignItems: "center"
  },
  logo_container:{
    height: 100,
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  logo_img:{
    height: 60
  },
  small_txt:{
    fontSize: 11,
    color: colorStyle.colorMainGray,
    marginTop: 5
  }
})

module.exports = styles;