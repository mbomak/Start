import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
// import pick from 'lodash/pick';
//
// import {
//     selectors as routerSelectors,
// } from 'modules/router';
// import {
//     selectors as summarySelectors,
// } from 'modules/summary';
// import {
//     actions as postsActions,
// } from 'modules/posts';
//
// import {
//     actions as topicsActions,
// } from 'modules/topics';
//
// import selectors from './selectors';
import * as actions from './actions';
import * as types from './constants';
import * as api from './api';

export function* fetchData({ payload }) {
    try {
        // const [queryParams] = yield all([
        //     select(routerSelectors.getParams),
        // ]);

        const params = {
            id: payload
        };

        const { data } = yield call(api.fetchData, params);

        yield put(actions.fetchDataSuccess(data));
    } catch (err) {
        yield put(actions.fetchDataError(err));
    }
}


// All sagas to be loaded
export default function* () {
    yield takeEvery(types.FETCH_DATA, fetchData);
    //yield takeLatest(types.SELECT_OCCASION, selectOccasion);
}
