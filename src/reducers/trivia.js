import * as types from '../actions/types';

const initialState = {
  numberOfQuestions: 0,
  difficulty: 'easy',
  difficultyLevels: ['easy', 'medium', 'hard', 'mix'],
  loadingQuestions: false,
  triviaQuestions: {}
}

export default function triviaReducer(state = initialState, action){
  switch (action.type) {
    case types.FETCH_REQUESTED:
      return {
        ...state,
        loadingQuestions: true
      }
    case types.FETCH_SUCCEEDED:
      return {
        ...state,
        triviaQuestions: action.data,
        loadingQuestions: false
      }
    case types.SELECT_NUMBER_OF_QUESTIONS:
      return {
        ...state,
        numberOfQuestions: action.numberOfQuestions
      }
    case types.SELECT_DIFFICULTY:
      return {
        ...state,
        difficulty: action.difficulty
      }
    default:
      return state;
  }
}
