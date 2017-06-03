import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import ScoreboardPage from '../pages/ScoreboardPage';

//actions
import * as actions from '../actions';

class ScoreboardContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isFocus: false
    }
  }

  render(){
    return (
      <ScoreboardPage
        actions={this.props.actions}
        pastScores={this.props.pastScores}
        navigation={this.props.navigation}
      />
    );
  }
}

ScoreboardContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  pastScores: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    pastScores: state.scoreboard.pastScores,
    isActiveRoute: state.scoreboard.isActiveRoute,
    navigation: state.nav
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardContainer)
