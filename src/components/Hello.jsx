import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

function Hello() {
  return (
    <View>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    backgroundColor: 'blue',
    fontSize: 40, // 単位はいらないとのこと
    fontWeight: 'bold',
    padding: 16,
  },
});

export default Hello;

// JSXの中でオブジェクトを扱うときには必ず{}を使用する。
// Reactの世界ではstyle={styles.text}書くと属性ではなくpropsと呼ばれる
