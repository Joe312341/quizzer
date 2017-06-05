import { takeEvery, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import realm from '../realms/realm';

// write to realm method
function writeToRealm(action) {
  realm.write(() => {
    realm.create('TriviaGame', {
      score: action.score,
      difficulty: action.difficulty,
      numberOfQuestions: action.numberOfQuestions,
      createdAt: new Date()
    });
  });
}

// request the realm object and make a copy
function* requestAllTriviaGames() {
  // true to sort in reverse
  const data = realm.objects('TriviaGame').sorted('createdAt', true)
  const realmArray = data.map((trivia) => {
    return {
      score: trivia.score,
      difficulty: trivia.difficulty,
      numberOfQuestions: trivia.numberOfQuestions,
      createdAt: trivia.createdAt
    }
  })
  yield put({ type: types.RECEIVED_STORAGE_DATA, data: realmArray})
}

export default function* watchRealmData() {
  yield takeEvery(types.WRITE_TO_STORAGE, writeToRealm)
  yield takeEvery(types.REQUEST_STORAGE_DATA, requestAllTriviaGames)
}
