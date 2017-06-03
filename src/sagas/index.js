import { all } from 'redux-saga/effects';
import watchFetchData from './fetchSagas';
import watchRealmData from './realmSagas';

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    watchRealmData()
  ])
}
