import { combineReducers } from 'redux';
import navigationReducer from './navigation';
import triviaReducer from './trivia';
import scoreboardReducer from './scoreboard';

const rootReducer = combineReducers({
  nav: navigationReducer,
  trivia: triviaReducer,
  scoreboard: scoreboardReducer,
});

export default rootReducer;
