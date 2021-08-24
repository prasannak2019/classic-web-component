import ObjectUtils from './object-utils';
import JSON5 from 'json5';

class JSONUtils {
    public static parse(jsonStr: string): any {
        if (!!jsonStr && !ObjectUtils.isString(jsonStr)) {
            return jsonStr;
        }
        const result = JSON5.parse(jsonStr);
        return result;
    }
    public static toString(obj: any): any {
        if (ObjectUtils.isString(obj)) {
            return obj;
        }
        return JSON.stringify(obj);
    }
    public static isJSON(data: any): boolean {
        try {
            JSON5.parse(data);
            return true;
        } catch (e) {
            return false;
        }
    }
    public static getJSONObject(data: any): any {
        try {
            return JSON5.parse(data);
        } catch (e) {
            return null;
        }
    }

    /* istanbul ignore next */
    public static install(): void {
        if (typeof Object.keys !== 'function') {
            (function() {
                var hasOwn = Object.prototype.hasOwnProperty;
                Object.keys = Object_keys;
                function Object_keys(obj: any) {
                    var keys = [],
                        name;
                    for (name in obj) {
                        if (hasOwn.call(obj, name)) {
                            keys.push(name);
                        }
                    }
                    return keys;
                }
            })();
        }

        if (typeof Object.values !== 'function') {
            (function() {
                Object.values = Object_values;
                function Object_values(json: any) {
                    const values: Array<string> = new Array<string>();
                    const keys: Array<string> = JSONUtils.getKeys(json);
                    for (let i = 0; keys && i < keys.length; i++) {
                        const key: string = keys[i];
                        const value: string = json[key];
                        values.push(value);
                    }
                    return values;
                }
            })();
        }
    }

    public static getKeys(json: any): Array<string> {
        return Object.keys(json);
    }
    public static getValues(json: any): Array<string> {
        return Object.values(json);
    }

    public static getValue<T = any>(json: { [key: string]: T }, key: string): T {
        return json[key];
    }

    public static stringTMapToJson<T>(map: Map<string, T>): { [s: string]: T } {
        const json: { [s: string]: T } = {};
        if (map) {
            map.forEach((value: T, key: string) => {
                json[key] = value;
            });
        }
        return json;
    }

    public static numberTMapToJson<T>(map: Map<number, T>): { [s: number]: T } {
        const json: { [s: number]: T } = {};
        if (map) {
            map.forEach((value: T, key: number) => {
                json[key] = value;
            });
        }
        return json;
    }

    public static jsonToStringTMap<T>(json: { [s: string]: T }): Map<string, T> {
        const map: Map<string, T> = new Map<string, T>();
        if (json) {
            JSONUtils.getKeys(json).forEach((key: string) => {
                map.set(key, json[key]);
            });
        }
        return map;
    }
    public static jsonToNumberTMap<T>(json: { [s: number]: T }): Map<number, T> {
        const map: Map<number, T> = new Map<number, T>();
        if (json) {
            JSONUtils.getKeys(json).forEach((key: string) => {
                map.set(+key, json[+key]);
            });
        }
        return map;
    }

    public static cloneJSONObject(obj: any): any {
        if (!obj) return obj;
        if (obj instanceof Map) {
            const objCopy: { [key: string]: string } = {};
            new Map(obj).forEach((value: any, key: any) => {
                objCopy[key] = this.cloneJSONObject(value);
            });
            return objCopy;
        }
        return JSON.parse(JSON.stringify(obj));
    }

    public static IsJsonString(str: any) {
        try {
            JSON5.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

JSONUtils.install();

export default JSONUtils;
