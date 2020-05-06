import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from "../../../actions/userActions";
import * as IntlAction from "../../../actions/intlActions";
import styles from "./languagesScreenStyle";
import fonts from "../../../sharedStyles/fontStyle";

class languagesScreen extends Component{

    constructor(props) {
        super(props);
    }
    _updateLanguage = (lang) => {
        userActions._storeData('lang', lang);
        this.props.actions.intlAction(lang);
        this.props.navigation.goBack();
    };
    render(){
        const { intlData } = this.props;
        const languages = [
            { code: 'en', name: intlData.messages['settings']['languageEn'] },
            { code: 'cn', name: intlData.messages['settings']['languageCn'] },
            { code: 'ar', name: intlData.messages['settings']['languageAr'] },
            { code: 'ge', name: intlData.messages['settings']['languageGe'] },
            { code: 'sp', name: intlData.messages['settings']['languageSp'] },
            { code: 'ru', name: intlData.messages['settings']['languageRu'] },
            { code: 'po', name: intlData.messages['settings']['languagePo'] },
            { code: 'jp', name: intlData.messages['settings']['languageJp'] },
        ]
        const options = languages.map(language => {
            return (
                <TouchableOpacity 
                    style={[styles.item_wrap, styles.item_wrap_top_border]} 
                    onPress={()=>this._updateLanguage(language.code)} 
                    key={language.code}
                >
                    <Text style={[styles.item_wrap_txt, fonts.montserrat_regular]}>
                        {language.name}
                    </Text>
                </TouchableOpacity>
            );
        });
        return(
            <View style={styles.container}>
                <Text style={[styles.title, fonts.montserrat_bold]}>
                    {intlData.messages['settings']['languageSettings']}
                </Text>
                {options}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        intlData: state.IntlReducers
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
      {
        intlAction: IntlAction.updateLanguage,
      },
      dispatch
    )
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(languagesScreen);