import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Hello from './src/components/Hello';

export default function App() {
  return (
    // JSXゾーン
    <View style={styles.container}>
      <Hello></Hello>
      <Text>Open up App.js to start working on your app!</Text>
      {/* JSXコメントの書きかた */}
      {/* eslint-disable-next-line */}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
