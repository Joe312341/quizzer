import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Button, Picker, Slider } from 'react-native';
//utilities
import { capitalizeString } from '../utilities/stringHelpers';

class TriviaSelectionPage extends React.Component {
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
      <View>
        <Text>Triva!</Text>
        <Text>Select the difficulty level!</Text>
        <Picker
          selectedValue={this.props.difficulty}
          onValueChange={(difficulty) => this.props.actions.selectDifficulty(difficulty)}
        >
          {this.props.difficultyLevels.map((difficultyLevel) => {
            return (
              <Picker.Item key={difficultyLevel} label={capitalizeString(difficultyLevel)} value={difficultyLevel} />
            )
          })}
        </Picker>
        <Text>Select the number of questions</Text>
        <Text>Current Number of questions {this.props.numberOfQuestions}</Text>
        <Slider
          value={this.props.numberOfQuestions}
          step={1}
          minimumValue={1}
          maximumValue={20}
          onValueChange={(value) => this.props.actions.selectNumberOfQuestions(value)}
        />
        <Button onPress={() => this.props.actions.requestFetch(this.props.difficulty, this.props.numberOfQuestions)} title="Start!" />
        <Button onPress={this.goToDetailPage} title="To DetailPage" />
      </View>
    )
  }
}

TriviaSelectionPage.propTypes = {
  navigation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  difficulty: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TriviaSelectionPage;
