import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string, bool, shape } from 'prop-types';

function Hello(props) {
  // propsがApp.jsxから渡される。childrenで受け取れる
  // 分割代入 destructuring assingment = propsがオブジェクト構造のため
  // 分割代入することで構造化じゃなくしますよの意味
  const { children, bang, style } = props;
  return (
    <View>
      <Text style={[styles.text, style]}>
        {`Hello ${children}${bang ? '!' : ''}`}
      </Text>
    </View>
  );
}

Hello.propTypes = {
  // Helloコンポーネントを利用する場合に引数を必須とする。 .isRequired
  children: string.isRequired,
  bang: bool,
  // そのオブジェクトの形を定義するようなもの
  style: shape(),
};
// requiredではないpropsには初期値を設定する必要がある。
Hello.defaultProps = {
  bang: false,
  style: null,
};

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
