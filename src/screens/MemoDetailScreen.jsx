import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString } from '../utils'; // .jsはディレクトリ指定すれば読み込める。・

export default function MemoDetailScreen(props) {
  // rooteはreact-navigationで渡されている値。navigationと同じように登録されているすべてのオブジェクトから抜き出せる。
  // rooteの中に更にparamsが入っており、その中にidがある。
  const { navigation, route } = props;
  const { id } = route.params;
  console.log(id);
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unsubscribe = ref.onSnapshot((doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updateAt: data.updateAt.toDate(),
        });
      });
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        {/* && memoがfalseやnullでなかった場合のみmemo.bodyTextが実行される。 */}
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && dateToString(memo.updateAt)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>
      {/* ReactNativeではコアコンポーネントは独自にstyleを定義できるが、
      CircleButtonなど独自に定義されたコンポーネントは受け渡された側では
      styleが上書きできない。そのためstyleを上書きする方法を以下で実施
      step1 CircleButton側でpropsにstyleが入ってくることを定義
      step2 こちら側からstyleを渡してあげる */}
      <CircleButton
        style={{ top: 60, bottom: 'auto' }}
        name="edit-2"
        onPress={() => { navigation.navigate('MemoEdit'); }}
      />
      {/* navigate()に渡すものはApp.jsxで定義されたnameの部分 */}
      {/* オブジェクトを渡して上げるには{ { } }で囲んでね。 */}
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

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
