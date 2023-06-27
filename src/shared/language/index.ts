import { NativeModules, Platform } from 'react-native';

import languageJson from './LanguageResolver';
import { LANGUAGE } from '../Constants';

class Language {
    defaultLanguage: string;

    constructor() {
        this.defaultLanguage = this.getDefaultLanguage();
    }

    getDefaultLanguage(): string {
        let locale: string;
        if (Platform.OS === 'ios') {
            locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
        } else {
            locale = NativeModules.I18nManager.localeIdentifier;
        }

        locale = locale.split('_')[0];
        locale = locale.split('-')[0];
        let key: keyof typeof LANGUAGE;

        for (key in LANGUAGE) {
            if (locale === LANGUAGE[key]) {
                return locale;
            }
        }

        return LANGUAGE.ENGLISH;
    }
}

const languageStore = new Language();
export default languageJson[languageStore.defaultLanguage];
export { languageStore, languageJson };
