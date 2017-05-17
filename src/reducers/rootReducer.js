import { combineReducers } from 'redux';
import navigationReducer from './navigation';
import triviaReducer from './trivia';

const rootReducer = combineReducers({
  nav: navigationReducer,
  trivia: triviaReducer,
  // add more reducers
});

export default rootReducer;
