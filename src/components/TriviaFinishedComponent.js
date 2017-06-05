import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';

const TriviaFinishedComponent = ({ playerScore, numberOfTriviaQuestions, handleOnPress }) => (
  <View style={styles.finishedTile}>
    <Text>{`Your score was ${playerScore} out of ${numberOfTriviaQuestions}`}</Text>
    <Text>Play again with different settings and new questions!</Text>
    <Button
      onPress={() => handleOnPress()}
      title="Again!"
      color="#841584"
    />
  </View>
)

const styles = StyleSheet.create({
  finishedTile: {
    height: 200,
    backgroundColor: '#cddc39',
    borderColor: '#000033',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

TriviaFinishedComponent.propTypes = {
  playerScore: PropTypes.number.isRequired,
  numberOfTriviaQuestions: PropTypes.number.isRequired,
  handleOnPress: PropTypes.func.isRequired,
}

export default TriviaFinishedComponent;
