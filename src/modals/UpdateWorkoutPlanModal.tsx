import React, { useCallback, useEffect } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/AppStore';
import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons';

import { addWorkoutPlanThunk, editWorkoutPlanAction } from '../redux/actions/WorkoutActions';
import { setActiveWorkoutPlanAction } from '../redux/actions/UserActions';

import { UpdateWorkoutPlanModalProp } from '../navigation/types';
import { WorkoutDay, WorkoutPlanDataModel } from '../data/firebase/collections/Workouts';
import { collection, doc } from 'firebase/firestore';
import { db } from '../data/firebase/firebase';
import { CollectionName } from '../data/firebase/CollectionName';
import WorkoutDayCard from '../components/WorkoutDayCard';

function UpdateWorkoutPlanModal({route, navigation}: UpdateWorkoutPlanModalProp) {
  const language = useSelector((state: RootState) => state.user.language);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getWorkoutPlan = () => {
      if (route.params) {return route.params.workoutPlan};
      const newWorkoutPlan: WorkoutPlanDataModel = {
        createdBy: username,
        id: doc(collection(db, CollectionName.workout_plans())).id,
        name: '',
        workoutDays: [],
      };
      return newWorkoutPlan;
    };
    dispatch(editWorkoutPlanAction(getWorkoutPlan()));
  }, []);

  const workoutPlan = useSelector((state: RootState) => state.workout.editWorkoutPlan);

  const handleChange = (value: string) => {
    dispatch(editWorkoutPlanAction({...workoutPlan, name: value}));
  };

  const onSaveWorkoutPlan = useCallback(() => {
    if(workoutPlan.name) {
      dispatch(addWorkoutPlanThunk(workoutPlan));
      dispatch(setActiveWorkoutPlanAction(workoutPlan));
      navigation.pop();
    }
  }, [workoutPlan]);

  const onWorkoutDayUpdate = useCallback((workoutRef?: {workoutDay: WorkoutDay, index: number}) => {
    navigation.navigate(
      'update_workout_day_modal_stack',
      {screen: 'update_workout_day_modal', params: {workoutRef: workoutRef}}
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.tittleContainer}>
          <MCIIcon size={30} name='arrow-left-thin' color='#666' onPress={() => navigation.pop()} />
          <TextInput
            style={styles.input}
            placeholder={language.new_plan_placeholder}
            value={workoutPlan.name}
            onChangeText={handleChange}
          />
          <MCIIcon size={30} name='check' color='#666' onPress={onSaveWorkoutPlan} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onWorkoutDayUpdate()} style={[styles.button]}>
            <MCIIcon size={30} name={'plus-circle-outline'} color='#fff' />
          </TouchableOpacity>
        </View>
        <FlatList
          data={workoutPlan.workoutDays}
          renderItem={({item, index}) =>
            <WorkoutDayCard
              workoutDay={item}
              index={index}
              onSelect={onWorkoutDayUpdate}
            />
          }
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default UpdateWorkoutPlanModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  tittleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 40,
    marginTop: 30,
  },
  input: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
