import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Alert,
} from 'react-native';

import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import { translateErrors } from '../utils';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');
  const handlePress = () => {
    const { currentUser } = firebase.auth(); // 現在ログインしているユーザIDを取得できる。
    const db = firebase.firestore(); // dbへ接続
    const ref = db.collection(`users/${currentUser.uid}/memos`); // コレクションmemoに対する参照
    // console.log(ref);
    ref.add({ // 参照からデータを追加する関数
      bodyText,
      updateAt: new Date(),
    })
      .then((docRef) => {
        console.log('Created!', docRef.id); // 作成されたドキュメントへの参照。ドキュメントの参照からdate()で中身を参照できる。
        navigation.goBack();
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
    // if (a == null) {
    //   console.log('nullだよ');
    // } else {
    // console.log('nullじゃないよ');
    // console.log(a);
    // nullじゃないよ 以下出力
    // Promise {
    //   "_U": 0,
    //   "_V": 0,
    //   "_W": null,
    //   "_X": null,
    // }
    // }
  };

  return (
    // KeyboardAvoidingViewはキーボードが表示された時に自動的に画面をリサイズしてくれる。
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    // 親コンポーネントにもflex 1を追記しないと子要素が広がらない
    flex: 1,
    paddingHorizontal: 27,
    paddingVertical: 32,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
