import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// utilities
import { shuffleArray } from '../utilities/arrayHelpers';

class TriviaComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      triviaEnded: false,
    }
    this.createAnswersArray = this.createAnswersArray.bind(this);
    this.nextQuestionOrFinish = this.nextQuestionOrFinish.bind(this);
  }
  createAnswersArray(){
    const currentQuestion = this.props.triviaQuestions[this.state.currentQuestionIndex];
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
  nextQuestionOrFinish(isCorrect){
    const currentQuestionIndex = this.state.currentQuestionIndex;
    // check if last question, if so finish screen
    if(currentQuestionIndex === this.props.triviaQuestions.length -1){
      this.decideIfScoreIsAdded(isCorrect)
      this.setState({ triviaEnded: true })
    } else {
      const nextQuestionIndex = this.state.currentQuestionIndex + 1;
      this.decideIfScoreIsAdded(isCorrect)
      this.setState({ currentQuestionIndex: nextQuestionIndex})
    }
  }
  decideIfScoreIsAdded(isCorrect){
    if(isCorrect){
      this.props.actions.addToScore()
    }
    return
  }
  render(){
    const answers = this.createAnswersArray();
    const currentQuestion = this.props.triviaQuestions[this.state.currentQuestionIndex];
    return (
      <View>
        { this.state.triviaEnded ?
          <View>
            <Text>Done!</Text>
            <Text>{`Your score was ${this.props.playerScore}`}</Text>
          </View>
        :
          <View>
            <Text>{`${this.state.currentQuestionIndex + 1} / ${this.props.triviaQuestions.length}`}</Text>
            <Text>Category: {currentQuestion.category}</Text>
            <View style={styles.questionArea}>
              <Text>{currentQuestion.question}</Text>
            </View>
            <View style={styles.answerArea}>
              { answers.map((answer) => {
                return (
                  <TouchableOpacity onPress={() => this.nextQuestionOrFinish(answer.isCorrect)} key={answer.answerText} style={styles.answerTile} activeOpacity={0.5}>
                    <Text>{answer.answerText}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  answerArea: {
  },
  answerTile: {
    height: 50,
    backgroundColor: 'powderblue',
    borderColor: '#000033',
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
