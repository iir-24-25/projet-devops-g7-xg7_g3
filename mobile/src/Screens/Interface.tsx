import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Interface = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello Ouiam</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  helloText: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    color: '#39f198',
  },
});

export default Interface;
