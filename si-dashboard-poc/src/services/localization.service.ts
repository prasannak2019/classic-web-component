import { SimpleFormat, LanguageCode } from '../entities/localization';
import JSONUtils from '../utils/json-utils';
import ObjectUtils from '../utils/object-utils';
import messages from "../resources/messages";
import StringUtils from '../utils/string-utils';

class LocalizationService {
    public getMessage(
        languageCodeString: string,
        key: string,
        defaultMessage: string,
        model: { [key: string]: any },
        ...args: any
    ): string {
        const languageCode: LanguageCode = this.getLanguageCode(languageCodeString);
        let message: string = messages[languageCode][key] || defaultMessage || '';
        message = this.replaceString(message, model, args);
        return message;
    }

    public getLocalizedValue(value: any, languageCodeString: string, model: { [key: string]: any }, ...args: any): any {
        if (StringUtils.isNullOrUndefined(value)) {
            return null;
        }
        let simpleFormatAttr: SimpleFormat = null;
        if (Array.isArray(value)) {
            return value;
        } else if (typeof value === 'boolean') {
            return value;
        } else if (ObjectUtils.isNumber(value)) {
            return value;
        } else if (!ObjectUtils.isString(value)) {
            simpleFormatAttr = value as SimpleFormat;
        } else if (JSONUtils.IsJsonString(value)) {
            simpleFormatAttr = JSONUtils.parse(value as string);
        }
        let rst: string = null;
        if (simpleFormatAttr != null) {
            const languageCode: LanguageCode = this.getLanguageCode(languageCodeString);
            rst = simpleFormatAttr[languageCode] || simpleFormatAttr[LanguageCode.ENGLISH];
        } else {
            rst = value as string;
        }
        rst = this.replaceString(rst, model, args);
        return rst;
    }

    private replaceString(str: string, model: { [key: string]: any }, ...args: any): string {
        if (model) {
            str = StringUtils.fillTemplate(str, model);
        }
        if (args) {
            if (args && args.length > 0) {
                for (let i = 0; i < args.length; i++) {
                    str = str.replace(`{${i}}`, args[i]);
                    do {
                        str = str.replace(`{${i}}`, args[i]);
                    } while (str.includes(`{${i}}`));
                }
            }
        }
        return str;
    }

    private getLanguageCode(languageCodeString: string): LanguageCode {
        if ((languageCodeString || '') === LanguageCode.FRENCH) {
            return LanguageCode.FRENCH;
        }
        return LanguageCode.ENGLISH;
    }
}
// Export a singleton instance in the global namespace
export const localizationService = new LocalizationService();
