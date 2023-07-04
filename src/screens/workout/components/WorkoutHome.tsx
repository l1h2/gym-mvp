import React, { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/AppStore';
import { editWorkoutPlanAction, getWorkoutPlansThunk } from '../../../redux/actions/WorkoutActions';

import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { WorkoutsStackChildScreenProp } from '../../../navigation/types';
import { WorkoutDay, WorkoutPlanDataModel } from '../../../data/firebase/collections/Workouts';
import WorkoutDayCard from '../../../components/WorkoutDayCard';

interface Props {
  navigation: WorkoutsStackChildScreenProp;
}

const WorkoutHome = ({navigation}: Props) => {
  const activePlan = useSelector((state: RootState) => state.user.activeWorkoutPlan) as WorkoutPlanDataModel;
  const dispatch = useAppDispatch();

  const onSelectWorkoutPlan = useCallback(() => {
    dispatch(getWorkoutPlansThunk());
    navigation.navigate('select_workout_plan_modal');
  }, [dispatch, navigation]);

  const onAddWorkoutDay = useCallback(() => {
    dispatch(editWorkoutPlanAction(activePlan));
    navigation.navigate(
      'update_workout_day_modal_stack',
      {
        screen: 'update_workout_day_modal',
        params: {handlePlanEdit: true}
      }
    );
  }, [activePlan]);

  const onSelectWorkoutDay = useCallback((workoutRef: {workoutDay: WorkoutDay, index: number}) => {
    navigation.navigate('workout_day_details', {workoutRef: workoutRef});
  }, []);

  return (
    <>
      <View style={styles.tittleContainer}>
        <Text style={styles.tittleText}>{activePlan.name}</Text>
        <View style={styles.iconContainer}>
          <MCIIcon size={30} name='pencil-outline' color='#666' onPress={() => navigation.navigate('update_workout_plan_modal', {workoutPlan: activePlan})} />
          <MCIIcon size={30} name='dots-vertical-circle-outline' color='#666' onPress={onSelectWorkoutPlan} />
        </View>
      </View>
      <FlatList
        data={activePlan.workoutDays}
        renderItem={({item, index}) =>
          <WorkoutDayCard
            workoutDay={item}
            index={index}
            onSelect={onSelectWorkoutDay}
          />
        }
      />
      <View style={styles.buttonContainer}>
        <MCIIcon size={60} name='plus-circle' color='#0782F9' onPress={onAddWorkoutDay} />
      </View>
    </>
  );
};

export default WorkoutHome;

const styles = StyleSheet.create({
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
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin: 20,
  },
});
