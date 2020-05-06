const updateLanguage = language => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_LANGUAGE',
            language,
        });
    };
};

export default {
    updateLanguage,
};
  