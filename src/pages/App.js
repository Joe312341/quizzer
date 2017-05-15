import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
// pages
import MasterPage from '../pages/MasterPage';
import DetailPage from '../pages/DetailPage';

export const AppNavigator = StackNavigator({
  MasterPage: { screen: MasterPage },
  DetailPage: { screen: DetailPage }
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
