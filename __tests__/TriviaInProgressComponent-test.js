/*global test expect */
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TriviaInProgressComponent from '../src/components/TriviaInProgressComponent';

// question has been received by api
const currentQuestion = {
  category: "Entertainment: Cartoon & Animations",
  correct_answer: "Daffy Duck",
  difficulty: "easy",
  incorrect_answers: [], //not used
  question: "Which of these is NOT a Disney cartoon character?",
  type: "multiple"
}

const answers = [
  {
    answerText: "Scrooge McDuck",
    isCorrect: false
  },
  {
    answerText: "Daffy Duck",
    isCorrect: true
  },
  {
    answerText: "Donald Duck McDuck",
    isCorrect: false
  },
  {
    answerText: "Daisy McDuck",
    isCorrect: false
  }
]

const questionProgress = '1/2';

test('renders non answered question correctly', () => {

  const answeredState = false;
  const lastQuestion = false;
  const questionProgress = '1/2';

  const tree = renderer.create(
    <TriviaInProgressComponent
      currentQuestion={currentQuestion}
      lastQuestion={lastQuestion}
      questionProgress={questionProgress}
      answers={answers}
      answeredState={answeredState}
      onNextQuestion={()=>{}}
      onChangeAnswerStateAndScore={()=>{}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders answered question correctly', () => {

  const answeredState = false;
  const lastQuestion = true;

  const tree = renderer.create(
    <TriviaInProgressComponent
      currentQuestion={currentQuestion}
      lastQuestion={lastQuestion}
      questionProgress={questionProgress}
      answers={answers}
      answeredState={answeredState}
      onNextQuestion={()=>{}}
      onChangeAnswerStateAndScore={()=>{}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders answered question correctly which is the last question', () => {

  const answeredState = true;
  const lastQuestion = true;

  const tree = renderer.create(
    <TriviaInProgressComponent
      currentQuestion={currentQuestion}
      lastQuestion={lastQuestion}
      questionProgress={questionProgress}
      answers={answers}
      answeredState={answeredState}
      onNextQuestion={()=>{}}
      onChangeAnswerStateAndScore={()=>{}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
