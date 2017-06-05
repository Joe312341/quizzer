import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const TriviaInProgressComponent = ({ currentQuestion, lastQuestion, questionProgress, answers, answeredState, onNextQuestion, onChangeAnswerStateAndScore }) => (
  <View>
    <View style={[styles.headerTile, styles.tile]}>
      <Text>Question: {questionProgress}</Text>
      <Text>Category: {currentQuestion.category}</Text>
    </View>
    <View style={[styles.questionArea, styles.tile]}>
      <Text>{currentQuestion.question}</Text>
    </View>
    <View>
      { answers.map((answer) => {
        return (
          <TouchableOpacity
            key={answer.answerText}
            disabled={answeredState}
            onPress={() => !answeredState && onChangeAnswerStateAndScore(answer.isCorrect)}
            style={answeredState && answer.isCorrect ? [styles.correctAnswerTile, styles.tile] : [styles.answerTile, styles.tile]}
            activeOpacity={0.5}
          >
            <Text>{answer.answerText}</Text>
          </TouchableOpacity>
        )
      })}
      {answeredState &&
      <Button
        onPress={() => onNextQuestion()}
        title={lastQuestion ? "Results" : "Next Question"}
        color="#841584"
      />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  answerTile: {
    height: 50,
    backgroundColor: 'powderblue',
    borderColor: '#000033',
    borderWidth: 1,
  },
  correctAnswerTile: {
    height: 50,
    backgroundColor: '#85d826',
    borderColor: 'red',
    borderWidth: 1,
  },
  questionArea: {
    height: 100,
    backgroundColor: '#cddc39',
    borderColor: '#000033',
    borderWidth: 1,
  },
  headerTile: {
    backgroundColor: '#cddc39',
    borderColor: '#000033',
    borderWidth: 1,
    height: 50
  },
  tile: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

TriviaInProgressComponent.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
  lastQuestion: PropTypes.bool.isRequired,
  questionProgress: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  answeredState: PropTypes.bool.isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  onChangeAnswerStateAndScore: PropTypes.func.isRequired,
}

export default TriviaInProgressComponent;
