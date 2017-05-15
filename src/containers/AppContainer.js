import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import App from '../pages/App';

function configureStore(initialState){
  const enhancer = compose(
    applyMiddleware(
      ReduxThunk,
      logger
    )
  );
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore({});

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppContainer
