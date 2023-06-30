import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/AppStore';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WorkoutsStackChildScreenProp } from '../../../navigation/types';

interface Props {
  navigation: WorkoutsStackChildScreenProp;
}

const AddWorkout = ({navigation}: Props) => {
  const language = useSelector((state: RootState) => state.user.language);

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('update_workout_plan_modal')} style={[styles.button, styles.buttonOutline]}>
        <MCIIcon size={20} name={'plus-circle-outline'} color={'#0782F9'} />
        <Text style={styles.buttonOutlineText}>{language.add_workout}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddWorkout;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
    marginLeft: 10,
  },
});
