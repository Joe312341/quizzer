import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Button } from 'react-native';

class MasterPage extends React.Component {
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
        <Text>MasterPage</Text>
        <Button onPress={this.goToDetailPage} title="To DetailPage" />
      </View>
    )
  }
}

MasterPage.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default MasterPage;
