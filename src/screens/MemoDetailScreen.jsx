import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2020年12月24日 10:00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          買い物リスト
          書体やレイアウトなどを確認するために用います。
          本文用なので使い方を間違えると不自然に見えることもありますので要注意。
        </Text>
      </ScrollView>
      {/* ReactNativeではコアコンポーネントは独自にstyleを定義できるが、
      CircleButtonなど独自に定義されたコンポーネントは受け渡された側では
      styleが上書きできない。そのためstyleを上書きする方法を以下で実施
      step1 CircleButton側でpropsにstyleが入ってくることを定義
      step2 こちら側からstyleを渡してあげる */}
      <CircleButton style={{ top: 160, bottom: 'auto' }}>+</CircleButton>
      {/* オブジェクトを渡して上げるには{ { } }で囲んでね。 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
