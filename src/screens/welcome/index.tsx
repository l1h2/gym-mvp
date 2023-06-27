import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/AppStore';

import { WelcomeScreenProp } from '../../navigation/types';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../data/firebase/firebase';
import { getUserThunk } from '../../redux/actions/UserActions';

const Onboarding = ({navigation}: WelcomeScreenProp) => {
  const language = useSelector((state: RootState) => state.user.language);
  const dispatch = useAppDispatch();

  const guestLogin = async () => {
    try {
      const user = await signInAnonymously(auth);
      dispatch(getUserThunk(user.user.uid));
    } catch(err: any) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.welcomeMessage}>{language.welcome_message}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.button}>
        <Text style={styles.buttonText}>{language.login}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={guestLogin} style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>{language.guest_login}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signup')} style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>{language.sign_up}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    bottom: 100,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
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
