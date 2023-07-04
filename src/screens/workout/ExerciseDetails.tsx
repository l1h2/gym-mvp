import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/AppStore';

import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { ExercisesDetailsScreenProp } from '../../navigation/types';
import { WorkoutPlanDataModel } from '../../data/firebase/collections/Workouts';

function ExerciseDetails({navigation, route}: ExercisesDetailsScreenProp) {
  const workoutPlan = useSelector((state: RootState) => state.user.activeWorkoutPlan) as WorkoutPlanDataModel;
  const exercise = route.params.exercise

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tittleContainer}>
        <MCIIcon size={30} name='arrow-left-thin' color='#666' onPress={() => navigation.pop()} />
        <Text style={styles.tittleText}>{exercise.name}</Text>
      </View>
      <Image style={styles.imageCard} source={{uri:exercise.gifURL}} />
    </SafeAreaView>
  );
}

export default ExerciseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  tittleContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  tittleText: {
    width: '80%',
    paddingLeft: 30,
    alignSelf: 'flex-end',
    fontWeight: '700',
    fontSize: 32,
  },
  imageCard: {
    width: 300,
    height: 300,
  },
});
