import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
// components
import TriviaContainer from '../containers/TriviaContainer';
import DetailPage from '../pages/DetailPage';

export const AppNavigator = StackNavigator({
  MasterPage: { screen: TriviaContainer },
  DetailPage: { screen: DetailPage } // replace with a container depending of the detail page function
});

const App = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({dispatch: dispatch, state: nav })}
  />
)

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nav: state.nav
});


export default connect(mapStateToProps)(App);
