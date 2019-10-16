import {FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR} from '../actions/actions';


const initialState = {
    pending: false,
    data: "",
    error: null
}

export default function reducer(state = initialState, action) {   
    switch(action.type) {
        case FETCH_DATA_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload
            }
        case FETCH_DATA_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getDataSuccess = state => state.data;
export const getDataPending = state => state.pending;
export const getDataError = state => state.error;

function getReduxInfo(payload, TYPE){
    return {
      type: TYPE,
      payload
    };
  }

export const setReduxAddInfo = (payload) => {
    return (dispatch, getState) => {
      return dispatch(getReduxInfo(payload, FETCH_DATA_SUCCESS));
    }
  }