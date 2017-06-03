import * as types from './types';

export function selectNumberOfQuestions(numberOfQuestions){
  return {
    type: types.SELECT_NUMBER_OF_QUESTIONS,
    numberOfQuestions
  }
}

export function selectDifficulty(difficulty){
  return {
    type: types.SELECT_DIFFICULTY,
    difficulty
  }
}

export function requestFetch(difficulty, questionNumber){
  return {
    type: types.FETCH_REQUESTED,
    difficulty,
    questionNumber
  }
}

export function addToScore(){
  return {
    type: types.ADD_TO_SCORE
  }
}

export function restartTrivia(){
  return {
    type: types.RESTART_TRIVIA
  }
}

export function writeToStore(score, difficulty, numberOfQuestions){
  return {
    type: types.WRITE_TO_STORAGE,
    score,
    difficulty,
    numberOfQuestions
  }
}

export function requestAllStorage(){
  return {
    type: types.REQUEST_STORAGE_DATA
  }
}

export function setActiveRoute(bool){
  return {
    type: types.SET_ACTIVE_ROUTE,
    bool
  }
}
