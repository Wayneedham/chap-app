import { StyleSheet,Platform, } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import colorStyle from '../../sharedStyles/colorStyle';

const styles = StyleSheet.create({
  tabaricon : {
    height : verticalScale(15),
    width: verticalScale(15)
  },
  tabItem_container:{
    paddingTop: Platform.OS === 'ios' ? 6 : 15,
    marginBottom: Platform.OS === 'ios' ? 6 : 15,
    alignItems: 'center',
  },
  focusedicontext : {
    color : colorStyle.colorMainGray,
    fontSize: 10,
    marginTop: 5,
  },
  unfocusedicontext :{
    color : colorStyle.colorInactiveTab,
    fontSize: 10,
    marginTop: 5,
  }

})

module.exports = styles;
