import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
// utilities
import { shuffleArray } from '../utilities/arrayHelpers';

// components
import TriviaFinishedComponent from '../components/TriviaFinishedComponent';

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
          <View>
            <Text>{`${this.state.currentQuestionIndex + 1} / ${this.props.triviaQuestions.length}`}</Text>
            <Text>Category: {currentQuestion.category}</Text>
            <View style={styles.questionArea}>
              <Text>{currentQuestion.question}</Text>
            </View>
            <View>
              { this.answers.map((answer) => {
                return (
                  <TouchableOpacity
                    key={answer.answerText}
                    disabled={this.state.answeredState}
                    onPress={() => !this.state.answeredState && this.changeToAnsweredStateAndAddScore(answer.isCorrect)}
                    style={this.state.answeredState && answer.isCorrect ? styles.correctAnswerTile : styles.answerTile}
                    activeOpacity={0.5}
                  >
                    <Text>{answer.answerText}</Text>
                  </TouchableOpacity>
                )
              })}
              {this.state.answeredState &&
              <Button
                onPress={() => this.nextQuestionOrFinish()}
                title="Next Question"
                color="#841584"
              />}
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  answerTile: {
    height: 50,
    backgroundColor: 'powderblue',
    borderColor: '#000033',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  correctAnswerTile: {
    height: 50,
    backgroundColor: '#85d826',
    borderColor: 'red',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionArea: {
    height: 100,
    backgroundColor: '#cddc39',
    borderColor: '#000033',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
TriviaComponent.propTypes = {
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired,
  playerScore: PropTypes.number.isRequired
}

export default TriviaComponent;
