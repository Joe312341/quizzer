/*global describe it expect */
import * as actions from '../src/actions';
import * as types from '../src/actions/types'

describe('test selectNumberOfQuestions action', () => {
  it('should create action to select number of questions', () => {
    const numberOfQuestions = 3
    const expectedAction = {
      type: types.SELECT_NUMBER_OF_QUESTIONS,
      numberOfQuestions
    }
    expect(actions.selectNumberOfQuestions(numberOfQuestions)).toEqual(expectedAction)
  })
});

describe('test selectDifficulty action', () => {
  it('should create action to select the difficulty', () => {
    const difficulty = 'easy';
    const expectedAction = {
      type: types.SELECT_DIFFICULTY,
      difficulty
    }
    expect(actions.selectDifficulty(difficulty)).toEqual(expectedAction)
  })
});

describe('test requestFetch action', () => {
  it('should create action to request fetching the data', () => {
    const difficulty = 'easy';
    const questionNumber = 3;
    const expectedAction = {
      type: types.FETCH_REQUESTED,
      difficulty,
      questionNumber
    }
    expect(actions.requestFetch(difficulty, questionNumber)).toEqual(expectedAction)
  })
});

describe('test addToScore action', () => {
  it('should create action to add to the score', () => {
    const expectedAction = {
      type: types.ADD_TO_SCORE
    }
    expect(actions.addToScore()).toEqual(expectedAction)
  })
});

describe('test restartTrivia action', () => {
  it('should create action to restart the trivia', () => {
    const expectedAction = {
      type: types.RESTART_TRIVIA
    }
    expect(actions.restartTrivia()).toEqual(expectedAction)
  })
});

describe('test writeToStore action', () => {
  it('should create action to write to realm store', () => {
    const score = 1;
    const difficulty = 'easy';
    const numberOfQuestions = 3;
    const expectedAction = {
      type: types.WRITE_TO_STORAGE,
      score,
      difficulty,
      numberOfQuestions
    }
    expect(actions.writeToStore(score, difficulty, numberOfQuestions)).toEqual(expectedAction)
  })
});


describe('test requestAllStorage action', () => {
  it('should create action to request the realm storage data', () => {
    const expectedAction = {
      type: types.REQUEST_STORAGE_DATA
    }
    expect(actions.requestAllStorage()).toEqual(expectedAction)
  })
});
