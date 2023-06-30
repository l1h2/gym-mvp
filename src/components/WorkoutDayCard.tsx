import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WorkoutDay } from '../data/firebase/collections/Workouts';

interface Props {
  workoutDay: WorkoutDay;
  index: number;
  onSelect: (workoutRef: {workoutDay: WorkoutDay, index: number}) => void;
}

const WorkoutDayCard = (props: Props) => {
  const {workoutDay, index, onSelect} = props;

  const onPress = () => {
    const workoutRef = {workoutDay: workoutDay, index: index}
    onSelect(workoutRef);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>{workoutDay.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(WorkoutDayCard);

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
