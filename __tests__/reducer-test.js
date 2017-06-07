/*global describe it expect */
import triviaReducer from '../src/reducers/trivia';
import * as types from '../src/actions/types';

describe('trivia reducer', () => {
  it('should return initial state', () => {
    expect(
      triviaReducer(undefined, {})
    ).toEqual({
        numberOfQuestions: 1,
        difficulty: 'easy',
        difficultyLevels: ['easy', 'medium', 'hard', 'mix'],
        loadingQuestions: false,
        triviaQuestions: [],
        triviaState: false,
        playerScore: 0
    })
  })
})
