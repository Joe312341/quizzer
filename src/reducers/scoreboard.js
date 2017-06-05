//Reducer for results of the trivia games which can be seen on the results screen
import * as types from '../actions/types'

const initialState = {
  pastScores: [],
}
export default function scoreboardReducer(state = initialState, action){
  switch (action.type) {
    case types.RECEIVED_STORAGE_DATA:
      return {
        ...state,
        pastScores: action.data
      }
    default:
      return state
  }
}
