import React, { useCallback, useState } from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/AppStore';
import { getExercisesThunk } from '../../redux/actions/ExerciseActions';
import { auth } from '../../data/firebase/firebase';
import { OnboardingScreenProp } from '../../navigation/types';

function Onboarding({navigation}: OnboardingScreenProp) {
  const exercises = useSelector((state: RootState) => state.exercise.exerciseList);
  const dispatch = useAppDispatch();
  const [isAppLoaded, setAppLoaded] = useState(false);

  const navigateNextScreen = useCallback(() => {
    navigation.navigate('welcome');
  }, [navigation]);

  const onOnboardImageClick = useCallback(() => {
    if (isAppLoaded) {
      navigateNextScreen();
    }
  }, [navigateNextScreen, isAppLoaded]);

  const loadApp = useCallback(() => {
    !exercises[0] && dispatch(getExercisesThunk());    
    setAppLoaded(true);
  }, []);

  if (isAppLoaded) {
    setTimeout(() => {
      !auth.currentUser && navigateNextScreen();
    }, 500);
  }

  if (!isAppLoaded) {
    loadApp();
  }

  return (
    <Pressable onPress={onOnboardImageClick} style={styles.container}>
      <Image source={require('../../assets/splash.png')} style={styles.imageContainer} />
    </Pressable>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
});
