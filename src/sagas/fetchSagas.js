/*global fetch */
import { Alert } from 'react-native';
import { put, takeEvery, call } from 'redux-saga/effects';
import * as types from '../actions/types';

function* fetchData(action) {
  const { difficulty, questionNumber } = action;
   try {
      const data = yield call(fetchTriviaQuestions, { difficulty, questionNumber})
      // fetch succeeded but response had no questions
      if(data.length === 0){
        const customError = {
          message: 'No questions were found'
        }
        yield put({ type: types.FETCH_FAILED, error: customError })
      } else {
        yield put({type: types.FETCH_SUCCEEDED, data})
      }
   } catch (error) {
      yield put({type: types.FETCH_FAILED, error})
   }
}

function fetchTriviaQuestions({ difficulty, questionNumber }) {
  let params;
  if(difficulty === 'mix'){
    params = `amount=${questionNumber}&type=multiple`
  } else {
    params = `amount=${questionNumber}&difficulty=${difficulty}&type=multiple`
  }
  const url = `https://opentdb.com/api.php?${params}`

  return fetch(url)
              .then(response => response.json())
              .then(json => json.results.map(child => child))
}

function showAlert(action) {
  Alert.alert(
    'Something went wrong',
    action.error.message,
    [
      {text: 'OK'}
    ],
    { cancelable: false }
  );
}

export default function* watchFetchData() {
  // listen to every dispatch of 'FETCH_REQUESTED' and 'FETCH_FAILED' and execute according functions
  yield takeEvery(types.FETCH_REQUESTED, fetchData)
  yield takeEvery(types.FETCH_FAILED, showAlert)
}
