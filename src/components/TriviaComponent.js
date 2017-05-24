// This component controlls the logic for the Trivia portion of the app,
// The trivia is either 'in progress' or 'finished', represented by two different presentational components
import React from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native';

// utilities
import { shuffleArray } from '../utilities/arrayHelpers';

// components
import TriviaFinishedComponent from '../components/TriviaFinishedComponent';
import TriviaInProgressComponent from '../components/TriviaInProgressComponent';
// we use local state in this component because these states are not use anywhere else and nothing derives from them
// see http://redux.js.org/docs/faq/OrganizingState.html#organizing-state-only-redux-state
class TriviaComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      triviaEnded: false,
      answeredState: false, // in this state the correct question is highlighted
    }
    this.createAnswersArray = this.createAnswersArray.bind(this);
    this.nextQuestionOrFinish = this.nextQuestionOrFinish.bind(this);
    this.changeToAnsweredStateAndAddScore = this.changeToAnsweredStateAndAddScore.bind(this);
  }
  componentWillMount(){
    // you should use this to store things that should NOT trigger a rerender
    // when we creata a new answer array and reshuffle it, we do not want to rerender the component
    this.answers = this.createAnswersArray(this.props.triviaQuestions[this.state.currentQuestionIndex])
  }
  componentWillUpdate(nextProps, nextState){
    if(this.state.currentQuestionIndex !== nextState.currentQuestionIndex){
      this.answers = this.createAnswersArray(this.props.triviaQuestions[nextState.currentQuestionIndex]);
    }
  }
  createAnswersArray(currentQuestion){
    const correctAnswer = currentQuestion.correct_answer;
    const incorrectAnswers = currentQuestion.incorrect_answers;

    // structure
    // correct_answer: ''
    // incorrect_answers: [{0: '', 1: '', 2: ''}]
    // do not mutate the other arrays
    const answerArray = [...incorrectAnswers, correctAnswer].map((answer, i) => {
      if(i === 3){
        return { answerText: answer, isCorrect: true}
      } else {
        return { answerText: answer, isCorrect: false}
      }
    });

    //shuffle
    shuffleArray(answerArray);

    return answerArray;
  }
  changeToAnsweredStateAndAddScore(isCorrect){
    this.decideIfScoreIsAdded(isCorrect)
    this.setState({answeredState: true})
  }
  nextQuestionOrFinish(){
    const currentQuestionIndex = this.state.currentQuestionIndex;
    // check if last question, if so finish screen
    if(currentQuestionIndex === this.props.triviaQuestions.length -1){
      this.setState({ triviaEnded: true, answeredState: false })
    } else {
      const nextQuestionIndex = this.state.currentQuestionIndex + 1;
      this.setState({ currentQuestionIndex: nextQuestionIndex, answeredState: false})
    }
  }
  decideIfScoreIsAdded(isCorrect){
    if(isCorrect){
      this.props.actions.addToScore()
    }
  }
  render(){
    const currentQuestion = this.props.triviaQuestions[this.state.currentQuestionIndex];

    return (
      <View>
        { this.state.triviaEnded ?
          <TriviaFinishedComponent
            playerScore={this.props.playerScore}
            handleOnPress={this.props.actions.restartTrivia}
          />
        :
          <TriviaInProgressComponent
            currentQuestion={currentQuestion}
            questionProgress={`${this.state.currentQuestionIndex + 1} / ${this.props.triviaQuestions.length}`}
            answers={this.answers}
            answeredState={this.state.answeredState}
            onNextQuestion={this.nextQuestionOrFinish}
            onChangeAnswerStateAndScore={this.changeToAnsweredStateAndAddScore}
          />
        }
      </View>
    )
  }
}

TriviaComponent.propTypes = {
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired,
  playerScore: PropTypes.number.isRequired
}

export default TriviaComponent;
