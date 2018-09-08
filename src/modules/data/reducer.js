/* eslint-disable indent */
import * as types from './constants';

const initialState = {
    postNumber: null,
    error: null,
    data: null
};

function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
    case types.FETCH_DATA:
        return {
            ...state,
            postNumber: payload,
        };
    case types.FETCH_DATA_SUCCESS:
        return {
            ...state,
            data: payload
        };
    case types.FETCH_DATA_ERROR:
        return {
            ...state,
            error: payload
        };
    default:
        return state;
    }
}

export default dataReducer;
