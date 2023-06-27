import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/AppStore';
import { setExerciseListAction } from '../../redux/actions/WorkoutActions';

import { BODY_PART_LIST } from '../../shared/Constants';
import BaseSearch from './BaseSearch';
import { ExerciseStackChildScreenProp, SearchExerciseModalProp } from '../../navigation/types';
import { ExerciseDataModel } from '../../data/firebase/collections/Exercises';

interface Props {
  name: string;
  navigation: ExerciseStackChildScreenProp;
  filteredExercises: ExerciseDataModel[];
}

const BodyPartCard = (props: Props) => {
  const {name, navigation, filteredExercises} = props;
  
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() =>
        navigation.navigate('filtered_exercises', {exercises: filteredExercises})}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

function SearchExercise({navigation}: SearchExerciseModalProp) {
  const exercises = useSelector((state: RootState) => state.exercise.exerciseList);
  const workoutDay = useSelector((state: RootState) => state.workout.editWorkoutDay);
  const dispatch = useAppDispatch();

  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    dispatch(setExerciseListAction(workoutDay.exercises));
  }, []);

  const toggleSearch = useCallback((value: string) => {
    value ? setIsSearchActive(true) : setIsSearchActive(false);
  }, []);

  return (
    <BaseSearch
      filteredExercises={exercises}
      activeSearch={isSearchActive}
      onSearch={toggleSearch}
      navigation={navigation}
    >
      {isSearchActive ? (
        <></>
      ) : (
        <FlatList
          data={BODY_PART_LIST}
          renderItem={({item}) =>
            <BodyPartCard
              name={item.name}
              navigation={navigation}
              filteredExercises={exercises.filter(exercise => exercise.bodyPart.includes(item.id))}
            />
          }
        />
      )}
    </BaseSearch>
  );
}

export default SearchExercise;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
