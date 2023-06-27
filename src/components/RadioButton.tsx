import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';

interface Props {
  name: string;
  isEnabled: boolean;
  onPress?: () => void;
}

function RadioButton(props: Props) {
  const {name, isEnabled, onPress} = props;

  return (
    <Pressable style={styles.radioButtonView} onPress={onPress}>
      <View style={styles.radioOuterCircle}>
        {isEnabled ? <View style={styles.radioInnerCircle} /> : null}
      </View>
      <Text style={styles.radioText}>{name}</Text>
    </Pressable>
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 6,
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
