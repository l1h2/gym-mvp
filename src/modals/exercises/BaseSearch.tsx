import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/AppStore';
import { editWorkoutDayAction, setExerciseListAction } from '../../redux/actions/WorkoutActions';

import ExerciseCard from '../../components/ExerciseCard';
import { ExerciseStackChildScreenProp } from '../../navigation/types';
import { Exercise } from '../../data/firebase/collections/Workouts';
import { ExerciseDataModel } from '../../data/firebase/collections/Exercises';

interface Props {
  filteredExercises: ExerciseDataModel[];
  children?: JSX.Element;
  activeSearch?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  onSearch?: (text: string) => void;
  navigation: ExerciseStackChildScreenProp;
}

function BaseSearch(props: Props) {
  const {filteredExercises, children, activeSearch, onSuccess, onCancel, onSearch, navigation} = props;
  const language = useSelector((state: RootState) => state.user.language);
  const workoutDay = useSelector((state: RootState) => state.workout.editWorkoutDay);
  const newExercises = useSelector((state: RootState) => state.workout.newExerciseList);
  const dispatch = useAppDispatch();

  const [searchedValue, setSearchedExercise] = useState('');
  const [exerciseList, setExerciseList] = useState(filteredExercises);

  const onChangeText = useCallback((value: string) => {
    onSearch && onSearch(value);
    const query = value.toLowerCase();
    const filteredExercises = exerciseList.filter(exercise => exercise.name.includes(query));
    setExerciseList(filteredExercises);
    setSearchedExercise(value);
  }, []);
  
  const onSuccessCallback = useCallback(() => {
    onSuccess && onSuccess();
    dispatch(editWorkoutDayAction({...workoutDay, exercises: newExercises}));
    navigation.getParent()?.goBack();
  }, [newExercises]);

  const isSelected = useCallback((exercise: Exercise) => {
    const results = newExercises.filter(item => item.name == exercise.name).length;
    if (results === 0) {
      return false;
    } else {
      return true;
    }
  }, [newExercises]);

  const onSelectExercise = useCallback((exercise: Exercise, isSelected: boolean) => {
    if (isSelected) {
      const updatedList = newExercises.filter(item => item.name != exercise.name);
      dispatch(setExerciseListAction(updatedList));
    } else {
      const updatedList = newExercises.concat(exercise)
      dispatch(setExerciseListAction(updatedList));
    }
  }, [newExercises]);

  const onCancelCallback = useCallback(() => {
    onCancel && onCancel();
    navigation.getParent()?.goBack();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.input}
          placeholder={language.new_plan_placeholder}
          value={searchedValue}
          onChangeText={onChangeText}
        />
        {children}
        {activeSearch || activeSearch === undefined &&
          <FlatList
            data={exerciseList}
            renderItem={({item}) =>
              <ExerciseCard
                item={item}
                selected={isSelected(item)}
                onSelect={onSelectExercise}
              />
            }
          />
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancelCallback}>
            <Text style={styles.buttonText}>{language.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSuccessCallback}>
            <Text style={styles.buttonText}>{language.done}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default BaseSearch;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 36
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 50,
  },
  input: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});
