import { all } from 'redux-saga/effects';

import { saga as dataSaga } from 'modules/data';

export default function* () {
    yield all([
        dataSaga(),
    ]);
}
