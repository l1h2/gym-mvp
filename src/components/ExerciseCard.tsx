import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ExerciseDataModel } from '../data/firebase/collections/Exercises';
import { Exercise } from '../data/firebase/collections/Workouts';

interface Props {
  item: ExerciseDataModel;
  selected?: boolean;
  isEditEnabled?: boolean;
  onSelect?: (exercise: Exercise, isSelected: boolean) => void;
}

const ExerciseCard = (props: Props) => {
  const {item, selected, isEditEnabled, onSelect} = props;
  const [isSelected, setSelected] = useState(selected || false);

  const onPress = (exercise: ExerciseDataModel) => {
    isEditEnabled && setSelected(!isSelected);
    onSelect && onSelect(exercise, isSelected);
  };

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.searchGif} source={{uri:item.gifURL}} />
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={isSelected ?
          [styles.button, styles.buttonSelected]
        :
          [styles.button, styles.buttonOutline]
        }>
        <Text style={isSelected ? styles.buttonSelectedText : styles.buttonOutlineText}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(ExerciseCard);

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
  buttonSelected: {
    backgroundColor: 'white',
    color: 'green',
    marginTop: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonSelectedText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
  searchGif: {
    width: 100,
    height: 100,
    marginLeft: 20,
  },
});
