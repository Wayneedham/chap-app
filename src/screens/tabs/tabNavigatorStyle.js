import { StyleSheet,Platform, } from 'react-native';
import {  responsiveHeight,
          responsiveWidth,
          responsiveFontSize
} from 'react-native-responsive-dimensions';

import colorStyle from '../../sharedStyles/colorStyle';

const styles = StyleSheet.create({
  tabaricon : {
    height : responsiveWidth(5),
    width : responsiveWidth(5),
  },
  tabItem_container:{
    paddingTop: Platform.OS === 'ios' ? 6 : 15,
    marginBottom: Platform.OS === 'ios' ? 6 : 15,
    alignItems: 'center',
  },
  focusedicontext : {
    color : colorStyle.colorMainGray,
    fontSize: responsiveFontSize(1.4),
    marginTop: 5,
  },
  unfocusedicontext :{
    color : colorStyle.colorInactiveTab,
    fontSize: responsiveFontSize(1.4),
    marginTop: 5,
  }

})

module.exports = styles;
