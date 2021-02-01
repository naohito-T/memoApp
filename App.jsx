import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // JSXゾーン
    <View style={styles.container}>
      {/* JSXコメントの書きかた */}
      {/* eslint-disable-next-line */}
      <View style={styles.appbar}>
        <View style={styles.appbarInner}>
          <Text style={styles.appbarTitle}>Memo App</Text>
          <Text style={styles.appbarRight}>ログアウト</Text>
        </View>
      </View>

      <View>
        <View style={styles.memoListItem}>
          <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020年12月24日 10:00</Text>
          </View>
          <View>
            <Text>X</Text>
          </View>
        </View>
        <View style={styles.memoListItem}>
          <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020年12月24日 10:00</Text>
          </View>
          <View>
            <Text>X</Text>
          </View>
        </View>
        <View style={styles.memoListItem}>
          <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2020年12月24日 10:00</Text>
          </View>
          <View>
            <Text>X</Text>
          </View>
        </View>
      </View>

      <View style={styles.circleButton}>
        <Text style={styles.circleButtonLable}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  appbar: {
    width: '100%',
    height: 104,
    backgroundColor: '#467FD3',
    justifyContent: 'flex-end', // Reactではflexboxの向きがhtmlと逆
  },
  appbarInner: {
    alignItems: 'center',
  },
  appbarRight: {
    position: 'absolute',
    right: 19,
    bottom: 16,
    color: 'rgba( 255, 255, 255, 0.8)',
  },
  appbarTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16, // Vertical = 垂直
    paddingHorizontal: 19, // Horizontal = 水平
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
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
