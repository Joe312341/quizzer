/*global test expect */
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TriviaSelectionComponent from '../src/components/TriviaSelectionComponent';

test('renders initial layout correctly', () => {
  // initial state of reducer
  const difficulty = 'easy';
  const difficultyLevels = ['easy', 'medium', 'hard', 'mix'];
  const numberOfQuestions = 1;
  const actions = {};

  const tree = renderer.create(
    <TriviaSelectionComponent
      actions={actions}
      difficulty={difficulty}
      numberOfQuestions={numberOfQuestions}
      difficultyLevels={difficultyLevels}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders different slider state than initial state correctly', () => {
  // initial state of reducer
  const difficulty = 'medium';
  const difficultyLevels = ['easy', 'medium', 'hard', 'mix'];
  const numberOfQuestions = 1;
  const actions = {};

  const tree = renderer.create(
    <TriviaSelectionComponent
      actions={actions}
      difficulty={difficulty}
      numberOfQuestions={numberOfQuestions}
      difficultyLevels={difficultyLevels}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders different picker state than initial state correctly', () => {
  // initial state of reducer
  const difficulty = 'easy';
  const difficultyLevels = ['easy', 'medium', 'hard', 'mix'];
  const numberOfQuestions = 10;
  const actions = {};

  const tree = renderer.create(
    <TriviaSelectionComponent
      actions={actions}
      difficulty={difficulty}
      numberOfQuestions={numberOfQuestions}
      difficultyLevels={difficultyLevels}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
