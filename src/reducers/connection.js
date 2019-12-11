
export const NETWORK_CONNECT = 'NETWORK_CONNECT';

const initialState = {
    isConnected: true
}

export default function reducer(state = initialState, action) {   
    switch(action.type) {
        case NETWORK_CONNECT:
            return {
                ...state,
                isConnected: action.payload
            }      
        default: 
            return state;
    }
}


function getReduxInfo(payload, TYPE){
    return {
      type: TYPE,
      payload
    };
  }

export const setNetworkConnect = (payload) => {
    console.log("connect==", payload);
    return (dispatch, getState) => {
        return dispatch(getReduxInfo(payload, NETWORK_CONNECT));
    }
}
