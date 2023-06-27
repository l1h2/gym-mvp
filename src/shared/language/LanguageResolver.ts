import LanguageInterface from './LanguageInterface';
import { LANGUAGE } from '../Constants';
import { en } from './en';
import { pt } from './pt';

interface StringToObject {
    [key: string]: LanguageInterface;
}

const languageJson: StringToObject = {
    [LANGUAGE.ENGLISH]: en,
    [LANGUAGE.PORTUGUESE]: pt,
};

export default languageJson;
