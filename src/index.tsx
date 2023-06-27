import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../src/navigation';

import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './data/firebase/firebase';

import { withAppStore, useAppDispatch } from '../src/redux/AppStore';
import { getUserThunk } from './redux/actions/UserActions';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(getUserThunk(user.uid));
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [onAuthStateChanged]);

  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' />
        <AppNavigation user={user} />
    </NavigationContainer>
  );
}

export default withAppStore<typeof App>(App);
