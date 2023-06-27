import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/AppStore';
import { editWorkoutPlanAction, getWorkoutPlansThunk } from '../../../redux/actions/WorkoutActions';

import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomBarChildScreenProp } from '../../../navigation/types';
import { WorkoutDay, WorkoutPlanDataModel } from '../../../data/firebase/collections/Workouts';

interface CardProps {
  workoutDay: WorkoutDay;
  navigation: BottomBarChildScreenProp;
  index: number;
}

const WorkoutDayCard = (props: CardProps) => {
  const {workoutDay, navigation, index} = props;

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('update_workout_day_modal', {
            workoutDay: {plan: workoutDay, index: index},
            isEditPlan: true,
          }
        )}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>{workoutDay.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

interface Props {
  navigation: BottomBarChildScreenProp;
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
    navigation.navigate('update_workout_day_modal');
  }, [activePlan]);

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
              navigation={navigation}
              index={index}
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
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin: 20,
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
