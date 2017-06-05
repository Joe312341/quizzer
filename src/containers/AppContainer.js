import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas'
import App from '../pages/App';

const sagaMiddleware = createSagaMiddleware()
// initial store setup
function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      logger
    )
  );
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore({});

// saga initialization
sagaMiddleware.run(rootSaga)

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppContainer
