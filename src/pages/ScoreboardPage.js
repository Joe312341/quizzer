import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ListView } from 'realm/react-native';
import { getCurrentRouteName } from '../utilities/routeHelpers';
import realm from '../realms/realm';

class ScoreboardPage extends React.Component {
  static navigationOptions = {
    title: 'My Scores',
  }
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
    // update store if realm changes
    realm.addListener('change', () => {
      this.props.actions.requestAllStorage()
    });
  }
  componentWillMount(){
    this.props.actions.requestAllStorage()
  }
  componentWillReceiveProps(nextProps){

    const { index, routes } = nextProps.navigation;
    // load realms when scoreboard screen is focused (navigated to)
    if(getCurrentRouteName(index, routes) === 'ScoreboardScreen'){
      this.setState({ dataSource: this.ds.cloneWithRows(nextProps.pastScores) })
    }
  }
  renderRow(data){
    if(data){
      return (
        <View style={styles.listViewItem}>
          <Text>Difficulty: {data.difficulty}</Text>
          <Text>Score: {data.score}</Text>
          <Text>Questions: {data.numberOfQuestions}</Text>
          <Text>{data.createdAt.toString()}</Text>
        </View>
      )
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>Your previous Scores</Text>
        { this.props.pastScores.length !== 0 ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => this.renderRow(data)}
          />
        : <ActivityIndicator /> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listViewItem: {
    borderColor: '#000033',
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 5
  },
  subTitle: {
    textAlign: 'center',
  }
})
ScoreboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  pastScores: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired
}

export default ScoreboardPage;
