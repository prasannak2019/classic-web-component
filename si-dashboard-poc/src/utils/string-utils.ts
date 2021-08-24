import Logger from './logger.utils';
import Utils from './utils';

/* eslint @typescript-eslint/no-unused-vars: 0 */
const templateLiteralSupportedInBrowser: boolean = true;
// try {
//     const keys: string[] = ['keyy1', 'key2'];
//     /* eslint no-template-curly-in-string: 0 */
//     /* eslint @typescript-eslint/no-unused-vars: 0 */
//     const testFun: Function = new Function(...keys, 'return `${testVar}`;');
// } catch (error) {
//     Logger.debug('template literal is not supported in the browser.');
//     templateLiteralSupportedInBrowser = false;
// }

export default class StringUtils {
    public static getMiddle(str: string, str1: string, str2: string): string {
        const len1: number = str1.length;
        const pos1: number = str.indexOf(str1);
        Logger.debug(`pos1=${pos1}`);
        if (pos1 >= 0) {
            const pos2: number = str.indexOf(str2, pos1 + len1);
            if (pos2 > pos1) {
                return str.substring(pos1 + len1, pos2);
            }
        }
        return '';
    }

    /* istanbul ignore next */
    public static isTemplateLiteralSupportedInBrowser(): boolean {
        return templateLiteralSupportedInBrowser;
    }

    private static hyphenateRE = /\B([A-Z])/g;
    public static hyphenate(str: string): string {
        return str.replace(StringUtils.hyphenateRE, '-$1').toLowerCase();
    }

    // this can only validate query string after # for vue router not for regular url
    public static parseQueryString(queryString: string): Map<string, string> {
        if (!queryString) {
            return new Map<string, string>();
        }
        let pos: number = queryString.indexOf('#');
        if (pos >= 0) {
            queryString = queryString.substring(0, pos);
        }

        pos = queryString.indexOf('?');
        if (pos >= 0) {
            queryString = queryString.substring(pos + 1);
        } else {
            queryString = '';
        }

        const params: Map<string, string> = new Map<string, string>();

        const queries: Array<string> = queryString.split('&');

        queries.forEach((indexQuery: string) => {
            const indexPair: Array<string> = indexQuery.split('=');

            const queryKey = decodeURIComponent(indexPair[0]);
            const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : '');

            params.set(queryKey, queryValue);
        });
        return params;
    }

    public static getParamValue(queryString: string, paramName: string): string {
        const params: Map<string, string> = StringUtils.parseQueryString(queryString);
        const value: string = params.get(paramName);
        return value || '';
    }

    public static setParamValue(queryString: string, paramName: string, paramValue: string): string {
        const params: { [key: string]: string[] } = StringUtils.parseQueryStringFromUrl(queryString);
        params[paramName] = params[paramName] || [];
        params[paramName].push(paramValue);
        let paramsStr: string = '';
        Object.keys(params).forEach((key: string) => {
            if (key.length > 0) {
                paramsStr += `&${key}=${params[key].join(`&${key}=`)}`;
            }
        });
        if (paramsStr.startsWith('&')) paramsStr = paramsStr.substring(1);

        let str1: string = queryString;
        let hashes: string = '';
        let pos: number = queryString.indexOf('?');
        if (pos >= 0) {
            str1 = queryString.substring(0, pos);
        }
        pos = str1.indexOf('#');
        if (pos >= 0) {
            str1 = str1.substring(0, pos);
        }

        pos = queryString.indexOf('#');
        if (pos >= 0) {
            hashes = queryString.substring(pos);
        }
        return `${str1}?${paramsStr}${hashes}`;
    }

    public static removeParam(queryString: string, paramName: string): string {
        const params: Map<string, string> = StringUtils.parseQueryString(queryString);
        params.delete(paramName);
        let paramsStr: string = '';
        params.forEach((value: string, key: string) => {
            if (key !== '') {
                paramsStr = `${paramsStr}&${key}=${value}`;
            }
        });
        if (paramsStr.startsWith('&')) paramsStr = paramsStr.substring(1);

        let str1: string = queryString;
        let hashes: string = '';
        let pos: number = queryString.indexOf('?');
        if (pos >= 0) {
            str1 = queryString.substring(0, pos);
        }
        pos = str1.indexOf('#');
        if (pos >= 0) {
            str1 = str1.substring(0, pos);
        }

        pos = queryString.indexOf('#');
        if (pos >= 0) {
            hashes = queryString.substring(pos);
        }
        return `${str1}?${paramsStr}${hashes}`;
    }

    public static replaceVaraibles(tpl: string, data: any, recusive: boolean = false): string {
        let re = /\$\{([^\}]+)?\}/g;
        let match;
        while ((match = re.exec(tpl))) {
            const value: any = data[match[1].trim()];
            if (value) {
                tpl = tpl.replace(match[0], `${value}`);
            }
            if (recusive) {
                tpl = StringUtils.replaceVaraibles(tpl, data, recusive);
            }
            re = /\$\{([^\}]+)?\}/g;
        }
        return tpl;
    }
    public static fillTemplate(templateString: string, templateVars: any, isStringTemplate: boolean = true): any {
        /* eslint no-new-func: 0 */
        const keys = Utils.getKeys(templateVars);
        const values = Utils.getValues(templateVars);
        if (StringUtils.isTemplateLiteralSupportedInBrowser() || !isStringTemplate) {
            const templateFunction = new Function(
                ...keys,
                isStringTemplate ? `return \`${templateString}\`;` : `return ${templateString}`,
            );
            return templateFunction(...values);
        }
        return StringUtils.replaceVaraibles(templateString, templateVars);
    }

    public static isMatch(str: string, regExp: string): boolean {
        const regex: RegExp = new RegExp(regExp);
        return regex.test(str);
    }

    public static isEmptyImageUrl(url: string): boolean {
        if (url && url.length > 0 && url.indexOf('=null') < 0) {
            return false;
        }
        return true;
    }

    public static replaceAll(str: string, from: string, to: string): string {
        if (!str) return str;
        return str.split(from).join(to);
    }

    public static parseQueryStringFromUrl(url: string): { [key: string]: string[] } {
        return this.getAllPartsOfUrl(url).params;
    }
    /** if you have only parameter in form of param1=value1&param2=value2 and you want to replace any of param,
     * please pass this param string in this way, ?param1=value1&param2=value2.
     */
    public static addOrReplaceQueryParams(url: string, params: { [paramKey: string]: string[] }): string {
        const urlParts = this.getAllPartsOfUrl(url);
        if (params) {
            Object.keys(params).forEach((key: string) => {
                urlParts.params[key] = params[key];
            });
        }
        let paramString = this.constructUrlParamsFromObject(urlParts.params);
        if (!this.isUndefinedOrNullOrEmpty(paramString)) {
            paramString = `?${paramString}`;
        }
        return `${urlParts.initialUrl}${paramString}${urlParts.hashes}`;
    }
    public static getAllPartsOfUrl(
        urlString: string,
    ): {
        initialUrl: string;
        hashes: string;
        params: { [key: string]: string[] };
    } {
        let url = urlString;
        let initialUrl: string = '';
        let hashes: string = '';
        const params: { [key: string]: string[] } = {};
        if (url) {
            let index = url.indexOf('#');
            if (index >= 0) {
                hashes = url.substring(index);
                url = url.substring(0, index);
            }
            index = url.indexOf('?');
            if (index >= 0) {
                initialUrl = url.substring(0, index);
                if (url.substring(index + 1).length > 0) {
                    url.substring(index + 1)
                        .split('&')
                        .forEach((indexQuery: string) => {
                            const indexPair: Array<string> = indexQuery.split('=');
                            const queryKey = decodeURIComponent(indexPair[0]);
                            const queryValue = params[queryKey] || [];
                            queryValue.push(decodeURIComponent(indexPair.length > 1 ? indexPair[1] : ''));
                            params[queryKey] = queryValue;
                        });
                }
            } else {
                initialUrl = url;
            }
        }
        return {
            initialUrl,
            hashes,
            params,
        };
    }
    /**
     * @param params of type key, value, where value is array of string, if only one value exist for a key lets say value is 1, can use simply [1]
     */
    public static constructUrlParamsFromObject(params: { [key: string]: string[] }): string {
        let result: string = '';
        if (params) {
            Object.keys(params).forEach((objKey: string) => {
                if (objKey.length > 0 && params[objKey]) {
                    const paramValue = typeof params[objKey] === 'object' ? params[objKey] : [params[objKey]];
                    result += `${objKey}=${paramValue.join(`&${objKey}=`)}&`;
                }
            });
        }
        return result;
    }
    public static isDefined(inString: string): boolean {
        return !this.isUndefinedOrNullOrEmpty(inString);
    }
    public static isUndefinedOrNullOrEmpty(inString: string): boolean {
        return !inString || inString === null || inString.trim().length === 0;
    }
    public static writeNestedJSON(key: string, value: any): string {
        if (this.isUndefinedOrNullOrEmpty(key)) {
            return '{}';
        }
        const nestedKeys: string[] = key.split('.');
        let startString = '{';
        let endString = '}';
        for (let i = 0; i < nestedKeys.length - 1; i++) {
            startString += `${nestedKeys[i]}: {`;
            endString += '}';
        }
        return `${startString}${nestedKeys[nestedKeys.length - 1]}: ${JSON.stringify(value)}${endString}`;
    }

    public static isNullOrUndefined(str: string): boolean {
        return str === null || str === undefined;
    }
}
