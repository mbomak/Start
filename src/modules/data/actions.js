import * as types from './constants';

export function fetchData(payload) {
    return {
        type: types.FETCH_DATA,
        payload
    };
}

export function fetchDataSuccess(payload) {
    return {
        type: types.FETCH_DATA_SUCCESS,
        payload
    };
}

export function fetchDataError(err) {
    return {
        type: types.FETCH_DATA_ERROR,
        payload: err,
        err: true
    };
}
