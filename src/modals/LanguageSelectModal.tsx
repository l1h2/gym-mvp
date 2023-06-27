import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/AppStore';
import { setLanguageAction } from '../redux/actions/UserActions';

import BaseModal from './BaseModal';
import { LanguageSelectionModalProp } from '../navigation/types';
import RadioButton from '../components/RadioButton';
import { LANGUAGE } from '../shared/Constants';
import { languageStore } from '../shared/language';

function LanguageSelectModal({navigation}: LanguageSelectionModalProp) {
  const language = useSelector((state: RootState) => state.user.language);
  const persistedLanguage = useSelector((state: RootState) => state.user.persisted_language);
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState({
    language: persistedLanguage.language,
    isDevice: persistedLanguage.isDeviceLanguage,
  });

  const onSaveLanguage = useCallback(() => {
    dispatch(
      setLanguageAction({
        language: selectedOption.language,
        isDeviceLanguage: selectedOption.isDevice,
      })
    );
  }, [selectedOption]);

  return (
    <BaseModal
      title={language.language}
      description={language.language_select_description}
      onSuccess={onSaveLanguage}
      navigation={navigation}>
      <>
        <RadioButton
          name={language.en}
          onPress={() =>
            setSelectedOption({language: LANGUAGE.ENGLISH, isDevice: false})
          }
          isEnabled={
            selectedOption.language === LANGUAGE.ENGLISH && !selectedOption.isDevice
          }
        />
        <RadioButton
          name={language.pt}
          onPress={() =>
            setSelectedOption({language: LANGUAGE.PORTUGUESE, isDevice: false})
          }
          isEnabled={
            selectedOption.language === LANGUAGE.PORTUGUESE && !selectedOption.isDevice
          }
        />
        <RadioButton
          name={language.system_default}
          onPress={() =>
            setSelectedOption({
              language: languageStore.getDefaultLanguage(),
              isDevice: true,
            })
          }
          isEnabled={selectedOption.isDevice}
        />
      </>
    </BaseModal>
  );
}

export default LanguageSelectModal;
