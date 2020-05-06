// import * as userActions from "../actions/userActions";

// async function initLanguage(){
//     const lang = await userActions._retrieveData('lang');
//     console.log({lang})
//     return {lang} ? {lang} : {lang: 'en'};
// };

const setLanguage = (language) => {
    let messages = {};
    switch (language) {
        case 'cn':
            messages = Object.assign(messages, require(`../i18n/cn.json`));
            break;
        case 'ar':
            messages = Object.assign(messages, require(`../i18n/ar.json`));
            break;
        case 'ge':
            messages = Object.assign(messages, require(`../i18n/ge.json`));
            break;
        case 'po':
            messages = Object.assign(messages, require(`../i18n/po.json`));
            break;
        case 'ru':
            messages = Object.assign(messages, require(`../i18n/ru.json`));
            break;
        case 'sp':
            messages = Object.assign(messages, require(`../i18n/sp.json`));
            break;
        case 'jp':
            messages = Object.assign(messages, require(`../i18n/jp.json`));
            break;
        default:
        case 'en':
            messages = Object.assign(messages, require(`../i18n/en.json`));
            break;
    }
    return messages;
};

var initialState = {
    locale: 'en',
    messages: setLanguage('en')
};

export default function reducer(state = initialState, action){
    if (action === undefined) return state;
    switch (action.type) {
        case 'UPDATE_LANGUAGE':
            return {
                locale: action.language,
                messages: setLanguage(action.language)
            };
        default:
            return state;
    }
};