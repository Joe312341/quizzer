//Reducer for results of the trivia games which can be seen on the results screen
import * as types from '../actions/types'

const initialState = {
  pastScores: [],
  isActiveRoute: false,
}
export default function scoreboardReducer(state = initialState, action){
  switch (action.type) {
    case types.RECEIVED_STORAGE_DATA:
      return {
        ...state,
        pastScores: action.data
      }
    case types.SET_ACTIVE_ROUTE:
      return {
        ...state,
        isActiveRoute: action.bool
      }
    default:
      return state
  }
}
