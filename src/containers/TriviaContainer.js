import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import TriviaPage from '../pages/TriviaPage';
//actions
import * as actions from '../actions';

class TriviaContainer extends React.Component {
  static navigationOptions = {
    title: 'Trivia',
  }
  constructor(props){
    super(props);
    this.state = {
      // if needed
    }
    this.queryTriviaApi = this.queryTriviaApi.bind(this);
  }
  queryTriviaApi(){
    const { difficulty, numberOfQuestions } = this.props;
    this.props.dispatch({ difficulty, numberOfQuestions });
  }
  render(){
    // our child component does not know about redux, therefore we bind actions and send them as props
    // instead of giving the child access to the dispatch function
    let boundActions = bindActionCreators(actions, this.props.dispatch);
    return (
      <TriviaPage
        actions={boundActions}
        numberOfQuestions={this.props.numberOfQuestions}
        difficulty={this.props.difficulty}
        difficultyLevels={this.props.difficultyLevels}
        loadingQuestions={this.props.loadingQuestions}
        triviaState={this.props.triviaState}
        triviaQuestions={this.props.triviaQuestions}
        playerScore={this.props.playerScore}
      />
    )
  }
}

TriviaContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired, // easy, medium, hard (add later)
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadingQuestions: PropTypes.bool.isRequired,
  triviaState: PropTypes.bool.isRequired,
  triviaQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerScore: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  numberOfQuestions: state.trivia.numberOfQuestions,
  difficulty: state.trivia.difficulty,
  difficultyLevels: state.trivia.difficultyLevels,
  loadingQuestions: state.trivia.loadingQuestions,
  triviaState: state.trivia.triviaState,
  triviaQuestions: state.trivia.triviaQuestions,
  playerScore: state.trivia.playerScore,
  fetchFailed: state.trivia.fetchFailed,
  errorMessage: state.trivia.errorMessage
})

export default connect(mapStateToProps)(TriviaContainer)
