import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/AppStore';

const Calendar = () => {
  const language = useSelector((state: RootState) => state.user.language);

  return (
    <View style={styles.container}>
      <Text>{language.placeholder_text}</Text>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
