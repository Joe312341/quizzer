import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../pages/App';

export default function navigationReducer(state, action) {
  let nextState;
  switch (action.type) {
    case 'Back':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'MasterPage':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'MasterPage' }), state);
      break;
    case 'DetailPage':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DetailPage' }), state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}
