import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// components
import TriviaSelectionPage from '../pages/TriviaSelectionPage';
//actions
import * as actions from '../actions';

class TriviaSelectionContainer extends React.Component {
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
      <TriviaSelectionPage
        actions={boundActions}
        navigation={this.props.navigation}
        numberOfQuestions={this.props.numberOfQuestions}
        difficulty={this.props.difficulty}
        difficultyLevels={this.props.difficultyLevels}
      />
    )
  }
}

TriviaSelectionContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired, // easy, medium, hard (add later)
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapStateToProps = (state) => ({
  numberOfQuestions: state.trivia.numberOfQuestions,
  difficulty: state.trivia.difficulty,
  difficultyLevels: state.trivia.difficultyLevels
})

export default connect(mapStateToProps)(TriviaSelectionContainer)
