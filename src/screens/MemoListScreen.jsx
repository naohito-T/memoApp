import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]); // useState()には初期値を渡す。
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    console.log('a');
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updateAt', 'desc');
      // console.log(ref);
      unsubscribe = ref.onSnapshot((snapshot) => {
        const userMemos = []; // 一時的な
        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data(), 'hello');
          const data = doc.data();
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updateAt: data.updateAt.toDate(), // firestoreのtimestampが入ってくる
          });
        });
        setMemos(userMemos);
      }, (error) => {
        console.log(error);
        Alert.alert('データの読み込みに失敗しました。');
      });
    }
    console.log(unsubscribe);
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {/* JSXコメントの書きかた */}
      {/* eslint-disable-next-line */}
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});
