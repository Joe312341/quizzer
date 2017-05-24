import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerLabel}>Quizzer App</Text>
  </View>
)

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerLabel: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700'
  }
})

export default AppHeader
