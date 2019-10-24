import {FETCH_LIST_PENDING, FETCH_LIST_SUCCESS, FETCH_LIST_ERROR} from '../actions/actions';


const initialState = {
    pending: false,
    data:[],
    error: null
}

export default function reducer(state = initialState, action) {   
    switch(action.type) {
        case FETCH_LIST_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload
            }
        case FETCH_LIST_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getListSuccess = state => state.data;
export const getListPending = state => state.pending;
export const getListError = state => state.error;
