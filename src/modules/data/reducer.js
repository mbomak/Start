import * as types from './constants';

const initialState = {
    balance: 0,
};

function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
    case types.ADD_FREE_CREDITS:
        return {
            ...state,
            balance: payload,
        };

    default:
        return state;
    }
}

export default dataReducer;
