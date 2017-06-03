import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { ListView } from 'realm/react-native';
import { getCurrentRouteName } from '../utilities/routeHelpers';

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
  }
  componentWillMount(){
    this.props.actions.requestAllStorage()
  }
  componentWillReceiveProps(nextProps){

    const { index, routes } = nextProps.navigation;
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
      <View>
        <Text>ScoreboardPage</Text>
        { this.props.pastScores.length !== 0 ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => this.renderRow(data)}
          />
        : <ActivityIndicator /> }
        <Button onPress={() => this.props.actions.requestAllStorage()} title="Request realms" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listViewItem: {
    borderColor: '#000033',
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 5
  }
})
ScoreboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  pastScores: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired
}

export default ScoreboardPage;
