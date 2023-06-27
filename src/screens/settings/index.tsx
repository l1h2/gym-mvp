import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/AppStore';
import { SettingsScreenProp } from '../../navigation/types';

import { signOut } from 'firebase/auth';
import { auth } from '../../data/firebase/firebase';

const Profile = ({navigation}: SettingsScreenProp) => {
  const language = useSelector((state: RootState) => state.user.language);
  const handleSingOut = async () => {
    try {
      await signOut(auth);
    } catch(err: any) {
      alert(err.message);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>{language.email}: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('language_selection_modal')}>
        <Text style={styles.buttonText}>{language.language}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSingOut}>
        <Text style={styles.buttonText}>{language.sign_out}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  menuButton: {
    backgroundColor: '#0782F9',
    width: '20%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    top: 10,
    left: 10,
    position: 'absolute',
  },
  profileButton: {
    backgroundColor: '#0782F9',
    width: '15%',
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    top: 10,
    right: 10,
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
