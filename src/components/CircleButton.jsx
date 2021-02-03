import React from 'react';
import { View, StyleSheet } from 'react-native';
import { string, shape } from 'prop-types';
import { Feather } from '@expo/vector-icons';

export default function CircleButton(props) {
  // 以下は分割代入
  // children = props.children とするのではなく
  // { children, style } = props; これで一気に代入できる。
  const { style, name } = props;
  return (
    <View style={[styles.circleButton, style]}>
      <Feather name={name} size={32} color="white" />
    </View>
  );
}
CircleButton.propTypes = {
  // shape()オブジェクトの形を定義する。どんな形のオブジェクトかを以下で定義する。
  // shape()にするとどんな形のオブジェクトでも対応ができる意味。
  style: shape(),
  name: string.isRequired,
};

CircleButton.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#467FD3',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    // shadow関係はiOSしか対応していない。
    shadowColor: '#000',
    // width = x height = y
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Androidにしか対応していないgoogleが提唱するマテリアルデザイン
    elevation: 8,
  },
  circleButtonLable: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
  },
});
