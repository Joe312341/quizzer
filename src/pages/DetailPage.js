import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Button } from 'react-native';

class DetailPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.goToMasterPage = this.goToMasterPage.bind(this);
  }
  goToMasterPage(){
    this.props.navigation.dispatch({ type: 'MasterPage' });
  }
  render(){
    return (
      <View>
        <Text>DetailPage</Text>
        <Button onPress={this.goToMasterPage} title="To MasterPage" />
      </View>
    )
  }
}

DetailPage.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default DetailPage;
