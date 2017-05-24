import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// components
import TriviaComponent from '../components/TriviaComponent';
import TriviaSelectionComponent from '../components/TriviaSelectionComponent';

class TriviaPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.goToDetailPage = this.goToDetailPage.bind(this);
  }
  goToDetailPage(){
    this.props.navigation.dispatch({ type: 'DetailPage' });
  }
  render(){
    return (
      <View style={styles.triviaContainer}>
        { this.props.loadingQuestions ?
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
          : this.props.triviaState ?
            <TriviaComponent
              triviaQuestions={this.props.triviaQuestions}
              actions={this.props.actions}
              playerScore={this.props.playerScore}
            />
            :
            <TriviaSelectionComponent
              actions={this.props.actions}
              difficulty={this.props.difficulty}
              numberOfQuestions={this.props.numberOfQuestions}
              difficultyLevels={this.props.difficultyLevels}
            />
            }
      </View>
    )
  }
}

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
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  difficulty: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingQuestions: PropTypes.bool.isRequired,
  triviaState: PropTypes.bool.isRequired,
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerScore: PropTypes.number.isRequired
}

export default TriviaPage;
