import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/AppStore';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { setActiveWorkoutPlanAction } from '../redux/actions/UserActions';

import { RootChildScreenProp, SelectWorkoutPlanModalProp } from '../navigation/types';
import { WorkoutPlanDataModel } from '../data/firebase/collections/Workouts';
import { deleteWorkoutPlanThunk } from '../redux/actions/WorkoutActions';

interface Props {
  workoutPlan: WorkoutPlanDataModel;
  activePlanID: string;
  navigation: RootChildScreenProp;
  isEditEnabled: boolean;
  workoutPlans: WorkoutPlanDataModel[];
}

const WorkoutCard = (props: Props) => {
  const {workoutPlan, activePlanID, navigation, isEditEnabled, workoutPlans} = props;
  const dispatch = useAppDispatch();
  const isActivePlan = workoutPlan.id == activePlanID;

  const onChooseActivePlan = useCallback(() => {
    dispatch(setActiveWorkoutPlanAction(workoutPlan));

    navigation.pop();
  }, []);

  const deleteWorkoutPlan = useCallback(() => {
    const isLastPlan = workoutPlans.length == 1;
    const backupPlan = workoutPlan.id == workoutPlans[0].id ? workoutPlans[1] : workoutPlans[0];

    if (isActivePlan) {
      dispatch(deleteWorkoutPlanThunk(workoutPlan.id));
      if (isLastPlan) {
        dispatch(setActiveWorkoutPlanAction({}));
        navigation.pop();
      } else {
        dispatch(setActiveWorkoutPlanAction(backupPlan))
      }
    } else {
      dispatch(deleteWorkoutPlanThunk(workoutPlan.id));
    }
  }, [workoutPlans]);

  const onDeleteWorkoutPlan = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this workout plan?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: deleteWorkoutPlan}
      ],
    );
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onChooseActivePlan} style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>{workoutPlan.name + (isActivePlan ? ' - Active' : '')}</Text>
      </TouchableOpacity>
      {isEditEnabled && <MCIIcon size={30} name='trash-can-outline' color='#666' onPress={onDeleteWorkoutPlan} />}
    </View>
  );
};

function SelectWorkoutPlanModal({navigation}: SelectWorkoutPlanModalProp) {
  const workoutPlans = useSelector((state: RootState) => state.workout.workoutPlans);
  const activeWorkoutPlan = useSelector((state: RootState) => state.user.activeWorkoutPlan) as WorkoutPlanDataModel;
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.tittleContainer}>
        <MCIIcon size={30} name='arrow-left-thin' color='#666' onPress={() => navigation.pop()} />
        <Text style={styles.tittleText}>Temporary tittle</Text>
        <MCIIcon size={30} name='pencil-outline' color='#666' onPress={() => setIsEditEnabled(!isEditEnabled)} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('update_workout_plan_modal')} style={[styles.button]}>
          <MCIIcon size={30} name={'plus-circle-outline'} color='#fff' />
        </TouchableOpacity>
      </View>
      <FlatList
        data={workoutPlans}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
          <WorkoutCard
            workoutPlan={item}
            activePlanID={activeWorkoutPlan.id}
            navigation={navigation}
            isEditEnabled={isEditEnabled}
            workoutPlans={workoutPlans}
          />
        }
      />
    </View>
  );
}

export default SelectWorkoutPlanModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  tittleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 40,
  },
  tittleText: {
    fontWeight: '700',
    fontSize: 32,
    marginRight: 60,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
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
    marginRight: 20,
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
