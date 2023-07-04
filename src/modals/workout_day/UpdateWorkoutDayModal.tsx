import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/AppStore';
import MCIIcon from '@expo/vector-icons/MaterialCommunityIcons';

import { UpdateWorkoutDayModalProp } from '../../navigation/types';
import { Exercise, WorkoutDay, WorkoutPlanDataModel } from '../../data/firebase/collections/Workouts';
import { addWorkoutPlanThunk, editWorkoutDayAction, editWorkoutPlanAction } from '../../redux/actions/WorkoutActions';
import { setActiveWorkoutPlanAction } from '../../redux/actions/UserActions';
import ExerciseCard from '../../components/ExerciseCard';

function UpdateWorkoutDayModal({route, navigation}: UpdateWorkoutDayModalProp) {
  const language = useSelector((state: RootState) => state.user.language);
  const workoutPlan = useSelector((state: RootState) => state.workout.editWorkoutPlan) as WorkoutPlanDataModel;
  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const handlePlanEdit = route.params?.handlePlanEdit || false;
  const workoutDays: WorkoutDay[] = JSON.parse(JSON.stringify(workoutPlan.workoutDays));

  useEffect(() => {
    const getWorkoutDay = () => {
      if (route.params?.workoutRef) {
        setIndex(route.params.workoutRef.index);
        return route.params.workoutRef.workoutDay;
      };

      setIndex(workoutDays.length);
      const newWorkoutDay: WorkoutDay = {
        days: [],
        name: '',
        exercises: [],
      };
      return newWorkoutDay;
    };
    dispatch(editWorkoutDayAction(getWorkoutDay()));
  }, []);

  const workoutDay = useSelector((state: RootState) => state.workout.editWorkoutDay);

  const handleChange = (value: string) => {
    dispatch(editWorkoutDayAction({...workoutDay, name: value}));
  };

  const onSaveWorkoutDay = useCallback(() => {
    if (!workoutDay.name) {return}
    workoutDays[index] = workoutDay;
    const newPlan = {...workoutPlan, workoutDays: workoutDays};
    if (handlePlanEdit) {
      dispatch(addWorkoutPlanThunk(newPlan));
      dispatch(setActiveWorkoutPlanAction(newPlan));
    } else {
      dispatch(editWorkoutPlanAction(newPlan))
    }
    navigation.pop();
  }, [workoutDay]);

  const onSelectExercise = useCallback((exercise: Exercise) => {
    navigation.navigate('update_exercise_details', {exercise: exercise})
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.tittleContainer}>
          <MCIIcon size={30} name='arrow-left-thin' color='#666' onPress={() => navigation.pop()} />
          <TextInput
            style={styles.input}
            placeholder={language.new_plan_placeholder}
            value={workoutDay.name}
            onChangeText={handleChange}
          />
          <MCIIcon size={30} name='check' color='#666' onPress={onSaveWorkoutDay} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('exercise_modal_stack', {screen: 'search_exercise'})} style={[styles.button]}>
            <MCIIcon size={30} name={'plus-circle-outline'} color='#fff' />
            <Text style={styles.buttonText}> Add exercise</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={workoutDay.exercises}
          renderItem={({item}) => <ExerciseCard item={item} onSelect={onSelectExercise} />}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default UpdateWorkoutDayModal;

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
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
