export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export const FETCH_LIST_PENDING = 'FETCH_LIST_PENDING';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_ERROR = 'FETCH_LIST_ERROR';

export function fetchDataPending() {
    return {
        type: FETCH_DATA_PENDING,
    }
}

export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export function fetchDataError(error) {
    return {
        type: FETCH_DATA_ERROR,
        error: error
    }
}


export function fetchListPending() {
    return {
        type: FETCH_LIST_PENDING,
    }
}

export function fetchListSuccess(data) {
    return {
        type: FETCH_LIST_SUCCESS,
        payload: data
    }
}

export function fetchListError(error) {
    return {
        type: FETCH_LIST_ERROR,
        error: error
    }
}

