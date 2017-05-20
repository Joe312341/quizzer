import { put, takeEvery, call, all } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as types from '../actions/types';

export function* fetchData(action) {
  const { difficulty, questionNumber } = action;
   try {
      const data = yield call(fetchTriviaQuestions, { difficulty, questionNumber})
      yield put({type: types.FETCH_SUCCEEDED, data})
   } catch (error) {
      yield put({type: types.FETCH_FAILED, error})
   }
}

export function fetchTriviaQuestions({ difficulty, questionNumber }) {
  return fetch(`https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${difficulty}&type=multiple`)
              .then(response => response.json())
              .then(json => json.results.map(child => child))
}

export function* watchFetchData() {
  // listen to dispatch of 'FETCH_REQUESTED' and then execute fetchData
  yield takeEvery(types.FETCH_REQUESTED, fetchData)
}

export default function* rootSaga() {
  yield all([
    watchFetchData()
  ])
}
// export function* fetchTriviaQuestionsWatcher({ difficulty, questionNumber}) {
// yield put( actions.requestsTriviaQuestions({ difficulty, questionNumber}) )
//  const triviaQuestions = yield call(fetchTriviaQuestions, { difficulty, questionNumber})
//  yield put( actions.receivePosts(reddit, posts) )
// }
