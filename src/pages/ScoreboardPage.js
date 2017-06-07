import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
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
        <Text style={styles.subTitle}>Your previous scores</Text>
        { this.props.pastScores.length !== 0 ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => this.renderRow(data)}
          />
        :
          <Text>You have no previous scores</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listViewItem: {
    margin: 5,
    borderColor: '#000033',
    borderBottomWidth: 1,
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
