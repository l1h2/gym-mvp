import React, { memo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/AppStore';
import { WorkoutsScreenProp } from '../../navigation/types';
import FirstWorkout from './components/FirstWorkout';
import WorkoutHome from './components/WorkoutHome';
import { WorkoutPlanDataModel } from '../../data/firebase/collections/Workouts';

const Workouts = ({navigation}: WorkoutsScreenProp) => {
  const activePlan = useSelector((state: RootState) => state.user.activeWorkoutPlan) as WorkoutPlanDataModel;
  
  return (
    <SafeAreaView style={styles.container}>
      {activePlan.id ? <WorkoutHome navigation={navigation} /> : <FirstWorkout navigation={navigation} />}
    </SafeAreaView>
  );
}

export default memo(Workouts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
