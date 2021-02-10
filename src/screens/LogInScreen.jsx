import React, { useState, useEffect } from 'react'; // useEffect ログインした瞬間に処理を実行できるようになる。
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { translateErrors } from '../utils';

export default function LogInScreen(props) {
  const { navigation } = props;
  // []配列からemailとsetEmailを取り出してる。こちらも分割代入
  // email 保持したい値(状態) setEmail 値を更新する関数
  // emailもsetEmailも変数の名前は自由。ただし慣習としてsetXXXするのが慣例
  const [email, setEmail] = useState(''); // ('')初期値
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);

  // propsが変わる度に毎回実行される(正確には毎回のrenderingの度に実行される。)
  useEffect(() => {
    // ログイン状態を監視できる。
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      } else {
        setLoading(false);
      }
    });
    // ログインスクリーンがアンムーンされる瞬間に監視を停止してくれる。
    return unsubscribe;
  }, []);
  // 空の配列を配置することで画面がrenderingされた際に一度だけ実行されるようになる。
  // []に

  const handlePress = () => {
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredentail) => {
        const { user } = userCredentail;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      .then(() => { // 成功でも失敗でも実行する処理
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          // iOSで登録があればキーチェーンから値を取ってくれる。
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          // iOSで登録があればキーチェーンから値を取ってくれる。
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    // lineHeightをTextInputに設定するとiOSでは下にくっついてしまう。
    //   lineHeight: 32,
    height: 48,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    color: '#467FD3',
    fontSize: 14,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
  },
});
