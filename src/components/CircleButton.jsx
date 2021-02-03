import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { string } from 'prop-types';

export default function CircleButton(props) {
  const { children } = props;
  return (
    <View style={styles.circleButton}>
      <Text style={styles.circleButtonLable}>{children}</Text>
    </View>
  );
}
CircleButton.propTypes = {
  children: string.isRequired,
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
