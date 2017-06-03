import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// components
import TriviaComponent from '../components/TriviaComponent';
import TriviaSelectionComponent from '../components/TriviaSelectionComponent';

const TriviaPage = ({ loadingQuestions, triviaState, triviaQuestions, actions, playerScore, difficulty, numberOfQuestions, difficultyLevels }) => (
  <View style={styles.triviaContainer}>
    { loadingQuestions ?
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
      : triviaState ?
        <TriviaComponent
          triviaQuestions={triviaQuestions}
          actions={actions}
          playerScore={playerScore}
          difficulty={difficulty}
        />
      :
        <TriviaSelectionComponent
          actions={actions}
          difficulty={difficulty}
          numberOfQuestions={numberOfQuestions}
          difficultyLevels={difficultyLevels}
        />
      }
  </View>
)

const styles = StyleSheet.create({
  triviaContainer: {
    flex: 1
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

TriviaPage.propTypes = {
  actions: PropTypes.object.isRequired,
  difficulty: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingQuestions: PropTypes.bool.isRequired,
  triviaState: PropTypes.bool.isRequired,
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerScore: PropTypes.number.isRequired,
}

export default TriviaPage;
