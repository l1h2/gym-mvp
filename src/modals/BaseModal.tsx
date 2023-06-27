import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/AppStore';

import { RootChildScreenProp } from '../navigation/types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  description: string;
  children?: JSX.Element;
  onSuccess?: () => void;
  onCancel?: () => void;
  navigation: RootChildScreenProp;
}

function BaseModal(props: Props) {
  const {title, description, children, onSuccess, onCancel, navigation} = props;
  const language = useSelector((state: RootState) => state.user.language);

  const onSuccessCallback = () => {
    navigation.pop();
    onSuccess && onSuccess();
  };
  const onCancelCallback = () => {
    navigation.pop();
    onCancel && onCancel();
  };

  return (
    <View style={styles.modalView}>
      <Text style={styles.modalTittle}>{title}</Text>
      <Text style={styles.modalText}>{description}</Text>
      {children}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onCancelCallback}>
          <Text style={styles.buttonText}>{language.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSuccessCallback}>
          <Text style={styles.buttonText}>{language.done}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 36,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 50,
  },
  modalTittle: {
    marginBottom: 20,
    fontSize: 20,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 40,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default React.memo(BaseModal);
