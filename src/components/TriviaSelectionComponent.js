import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Picker, Slider, Button, StyleSheet } from 'react-native';

//utilities
import { capitalizeString } from '../utilities/stringHelpers';

const TriviaSelectionComponent = ({ difficulty, difficultyLevels, actions, numberOfQuestions }) => (
  <View>
    <Text style={styles.labelText}>Welcome to the Trivia App. Select the difficulty level and the number of questions to start playing!</Text>
    <Picker
      selectedValue={difficulty}
      onValueChange={(newDifficulty) => actions.selectDifficulty(newDifficulty)}
    >
      {difficultyLevels.map((difficultyLevel) => {
        return (
          <Picker.Item key={difficultyLevel} label={capitalizeString(difficultyLevel)} value={difficultyLevel} />
        )
      })}
    </Picker>
    <Text style={styles.labelText}>Select the number of questions</Text>
    <Text style={styles.labelText}>Current Number of questions {numberOfQuestions}</Text>
    <Slider
      value={numberOfQuestions}
      step={1}
      minimumValue={1}
      maximumValue={20}
      onValueChange={(value) => actions.selectNumberOfQuestions(value)}
    />
    <Button onPress={() => actions.requestFetch(difficulty, numberOfQuestions)} title="Start!" />
  </View>
)

const styles = StyleSheet.create({
  difficultyTile: {
    backgroundColor: '#cddc39',
  },
  labelText: {
    fontWeight: '300',
    textAlign: 'center'
  },
})

TriviaSelectionComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  difficulty: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TriviaSelectionComponent;
