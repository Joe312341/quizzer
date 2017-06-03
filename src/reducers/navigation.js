import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../pages/App';

export default function navigationReducer(state, action) {
  let nextState;
  switch (action.type) {
    case 'Back':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'TriviaScreen':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'TriviaScreen' }), state);
      break;
    case 'ScoreboardScreen':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ScoreboardScreen' }), state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break;
  }
  return nextState || state;
}
