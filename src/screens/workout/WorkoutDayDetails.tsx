import React, { useCallback } from 'react';
import { Text, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/AppStore';

import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { WorkoutDayDetailsScreenProp } from '../../navigation/types';
import ExerciseCard from '../../components/ExerciseCard';
import { Exercise, WorkoutPlanDataModel } from '../../data/firebase/collections/Workouts';

function WorkoutDayDetails({navigation, route}: WorkoutDayDetailsScreenProp) {
  const workoutPlan = useSelector((state: RootState) => state.user.activeWorkoutPlan) as WorkoutPlanDataModel;
  const workoutRef = route.params.workoutRef;
  const workoutDay = workoutPlan.workoutDays[workoutRef.index];

  const onEditWorkoutDay = useCallback(() => {
    navigation.navigate(
      'update_workout_day_modal_stack',
      {
        screen: 'update_workout_day_modal',
        params: {
          workoutRef: {
            workoutDay: workoutDay,
            index: workoutRef.index
          },
          handlePlanEdit: true,
        },
      }
    )
  }, [workoutDay]);

  const onSelectExercise = useCallback((exercise: Exercise) => {
    navigation.navigate('exercise_details', {exercise: exercise})
  }, [workoutDay]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tittleContainer}>
        <MCIIcon size={30} name='arrow-left-thin' color='#666' onPress={() => navigation.pop()} />
        <Text style={styles.tittleText}>{workoutDay.name}</Text>
        <View style={styles.iconContainer}>
          <MCIIcon size={30} name='pencil-outline' color='#666' onPress={onEditWorkoutDay} />
        </View>
      </View>
      <FlatList
          data={workoutDay.exercises}
          renderItem={({item}) => <ExerciseCard item={item} onSelect={onSelectExercise} />}
        />
    </SafeAreaView>
  );
}

export default WorkoutDayDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tittleContainer: {
    flexDirection: 'row',
    width: '100%',
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
});
