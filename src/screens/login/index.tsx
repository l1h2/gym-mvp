import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from '../../redux/AppStore';
import { LoginScreenProp } from '../../navigation/types';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../data/firebase/firebase';

const Login = ({navigation}: LoginScreenProp) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const language = useSelector((state: RootState) => state.user.language);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(err: any) {
      alert(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={language.email_placeholder}
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
          />
          <TextInput
            style={styles.input}
            placeholder={language.password_placeholder}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType='password'
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>{language.login}</Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => alert('button pressed')}>
              <MCIIcon name='google' size={40} color='#465AFF' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('button pressed')}>
              <MCIIcon name='microsoft-windows' size={40} color='#465AFF' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('button pressed')}>
              <MCIIcon name='twitter' size={40} color='#465AFF' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('button pressed')}>
              <MCIIcon name='facebook' size={40} color='#465AFF' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('signup')} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>{language.sign_up_query}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
