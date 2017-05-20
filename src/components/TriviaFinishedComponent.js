import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

const TriviaFinishedComponent = ({ playerScore, handleOnPress }) => (
  <View>
    <Text>Done!</Text>
    <Text>{`Your score was ${playerScore}`}</Text>
    <Button
      onPress={() => handleOnPress()}
      title="Again!"
      color="#841584"
    />
  </View>
)

TriviaFinishedComponent.propTypes = {
  playerScore: PropTypes.number.isRequired,
  handleOnPress: PropTypes.func.isRequired,
}

export default TriviaFinishedComponent;
