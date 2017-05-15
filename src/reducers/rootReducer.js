import { combineReducers } from 'redux';
import navigationReducer from './navigation';

const rootReducer = combineReducers({
  nav: navigationReducer,
  // add more reducers
});

export default rootReducer;
