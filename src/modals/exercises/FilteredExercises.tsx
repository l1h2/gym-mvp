import React from 'react';
import BaseSearch from './BaseSearch';
import { FilteredExercisesModalProp } from '../../navigation/types';

function FilteredExercise({navigation, route}: FilteredExercisesModalProp) { 
  return (
    <BaseSearch
      filteredExercises={route.params.exercises}
      navigation={navigation}
    />
  );
}

export default FilteredExercise;
