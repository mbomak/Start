import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import pick from 'lodash/pick';

import {
  selectors as routerSelectors,
} from 'modules/router';
import {
  selectors as summarySelectors,
} from 'modules/summary';
import {
  actions as postsActions,
} from 'modules/posts';

import {
  actions as topicsActions,
} from 'modules/topics';

import selectors from './selectors';
import * as actions from './actions';
import * as types from './constants';
import * as api from './api';

const { OCCASIONS_PARAMS, TAKE_NUMBER, POSTS_TAKE } = types;

const normalizeData = (data) => {
  const byId = {};

  for (let item in data.byId) {
    if (data.byId.hasOwnProperty(item)) {
      byId[item] = {
        data: data.byId[item]
      };
    }
  }

  return {
    byId: byId,
    ids: data.ids
  };
};

export function* fetchOccasions({ payload }) {
  const { topicId, skip } = payload;

  try {
    const params = yield select(routerSelectors.getParams);
    const filteredParams = pick(params, OCCASIONS_PARAMS);

    filteredParams.topicId = topicId;
    filteredParams.skip = skip;
    filteredParams.take = TAKE_NUMBER;

    yield put(actions.fetchOccasionsRequest(topicId));
    const { data } = yield call(api.fetchOccasions, filteredParams);

    yield put(actions.fetchOccasionsSuccess(normalizeData(data), topicId));
  } catch (err) {
    yield put(actions.fetchOccasionsFail(topicId, err));
  }
}

export function* selectOccasion() {
  yield put(actions.fetchPosts());
  yield put(actions.fetchOccasionAnalytics());
  yield put(actions.fetchOccasionIncidents());
}

export function* fetchPosts() {
  const occasionId = yield select(selectors.getSelectedOccasionId);

  if (!occasionId) {
    return;
  }

  try {
    const loadedPosts = yield select(selectors.getOccasionPosts);
    const allParams = yield select(routerSelectors.getParams);
    const postId = yield select(selectors.getSelectedOccasionId);
    const topicId = yield select(routerSelectors.getActiveTopic);
    const type = yield select(selectors.getOccasionType);
    const occasDate = allParams.occasionDate;
    const summaryOpen = yield select(summarySelectors.getOpen);

    let params;

    if ((type === 'massMedia' || type === 'SocialMedia')   && !summaryOpen) {
      params = {
        blogId: postId,
        periodType: allParams.periodType,
        colorType: allParams.postsColorType,
        skip: loadedPosts ? loadedPosts.size : 0,
        take: POSTS_TAKE,
        topicId: topicId,
        indexType: allParams.occasionIndex,
      }
    } else {
      params = {
        blogHostId: (allParams.occasionIndex === 'om') ? '' : (allParams.occasionSocial || ''),
        occasionId,
        indexType: allParams.occasionIndex,
        //periodType: allParams.periodType,
        take: POSTS_TAKE,
        skip: loadedPosts ? loadedPosts.size : 0,
      };
    }

    if (occasDate && occasDate !== 'all') {
      params.date = occasDate;
    }

    yield put(actions.fetchPostsRequest(occasionId));
    const { data } = yield call(api.fetchPosts, params, type, summaryOpen);

    yield put(postsActions.fetchPostsSuccess(data.posts));
    yield put(actions.fetchPostsSuccess(occasionId, data.occasion, data.occasionPosts));

    // Снова запросим данные для топика,
    // если вернувшийся id occasion не совпадаетс с запрошенным и только в Темы/Регионы
    if (Number(data.occasion.Id) !== Number(occasionId) && type === 'default') {
      yield put(topicsActions.fetchTopicsId([topicId]));
    }

  } catch (err) {
    yield put(actions.fetchPostsFail(occasionId, err));
  }
}

export function* fetchOccasionAnalytics({ payload }) {
  const occasionId = yield select(selectors.getSelectedOccasionId);

  if (!occasionId) {
    return;
  }

  try {
    const occasColor = yield select(selectors.getOccasionColor);
    const allParams = yield select(routerSelectors.getParams);
    const topicId = yield select(selectors.getOccasionTopicId);
    const type = yield select(selectors.getOccasionType);
    const occasDate = allParams.occasionDate;
    const summaryOpen = yield select(summarySelectors.getOpen);

    if ((type === 'massMedia' || type === 'SocialMedia') && !summaryOpen) {
      return;
    }

    const params = {
      occasionId,
      colorType: occasColor,
      topicId: topicId ? topicId : allParams.topicId
    };

    if (occasDate && occasDate !== 'all') {
      params.date = occasDate;
    }

    if (!params.topicId) {
      return;
    }

    yield put(actions.fetchOcassionAnalyticsRequest(occasionId));
    const { data } = yield call(api.fetchOccasionAnalytics, params, type);

    yield put(actions.fetchOcassionAnalyticsSuccess(occasionId, data.analytics));
  } catch (err) {
    yield put(actions.fetchOcassionAnalyticsFail(occasionId, err));
  }
}

export function* fetchOccasionIncidents({ payload }) {
  const occasionId = yield select(selectors.getSelectedOccasionId);
  const type = yield select(selectors.getOccasionType);
  const summaryOpen = yield select(summarySelectors.getOpen);

  if (!occasionId) {
    return;
  }

  if ((type === 'massMedia' || type === 'SocialMedia') && !summaryOpen) {
    return;
  }

  /**
   * Ставит статус (найден, в работе и ответ дан) и смайл
   * @param {any} data
   */
  function setStatus (data) {

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      data[index].status = 'work';
      data[index].smile = '';

      if (element.Stage === 'Found') {
        data[index].status = 'found';
      }

      if (element.Stage === 'Done') {
        data[index].status = 'response';

        if (element.IsAuthorSatisfied === false) {
          data[index].smile = 'negative';
        }

        if (element.IsAuthorSatisfied === true) {
          data[index].smile = 'positive';
        }
      }
    }

    return data;
  }

  try {
    const params = {
      occasionId
    }

    yield put(actions.fetchOcassionIncidentsRequest(occasionId));
    let { data } = yield call(api.fetchOccasionIncidents, params);

    data = setStatus(data);

    yield put(actions.fetchOcassionIncidentsSuccess(occasionId, data));
  } catch (err) {
    yield put(actions.fetchOcassionIncidentsFail(occasionId, err));
  }
}

// All sagas to be loaded
export default function* () {
  yield takeEvery(types.FETCH_OCCASIONS, fetchOccasions);
  yield takeLatest(types.SELECT_OCCASION, selectOccasion);
  yield takeLatest(types.FETCH_POSTS, fetchPosts);
  yield takeLatest(types.FETCH_OCCASION_ANALYTICS, fetchOccasionAnalytics);
  yield takeLatest(types.FETCH_OCCASION_INCIDENTS, fetchOccasionIncidents);
};
