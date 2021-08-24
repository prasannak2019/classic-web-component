import JSONUtils from './json-utils';
import StringUtils from './string-utils';

export default class ObjectUtils {
    public static clone(obj: any): any {
        if (!obj) return obj;
        if (Array.isArray(obj)) {
            const array: Array<any> = obj as Array<any>;
            const clonedArray: Array<any> = new Array<any>();
            for (let i = 0; i < array.length; i++) {
                clonedArray.push(ObjectUtils.clone(array[i]));
            }
            return clonedArray;
        }
        return Object.assign({}, obj);
    }

    public static isString(obj: any): boolean {
        if (typeof obj === 'string' || obj instanceof String) {
            return true;
        }
        return false;
    }
    /* eslint no-restricted-globals: 0 */
    public static isNumber(value: any): boolean {
        return !isNaN(Number(value));
    }

    public static isPromise(obj: any): boolean {
        return obj instanceof Promise || (!!obj && typeof obj.then === 'function');
    }

    public static getClonedSet<T>(set: Set<T>): Set<T> {
        if (!set) return null;
        const newSet: Set<T> = new Set<T>();
        set.forEach(element => newSet.add(element));
        return newSet;
    }

    /** this method doesn't work like Object.util, it simply returns merged object instead of changing current object */
    public static assign(dest: any = {}, source: any = {}) {
        const destination = JSONUtils.cloneJSONObject(dest);
        Object.keys(source).forEach((key: string) => {
            if (typeof destination[key] === 'object') {
                destination[key] = ObjectUtils.assign(destination[key], source[key]);
            } else {
                destination[key] = JSONUtils.cloneJSONObject(source[key]);
            }
        });
        return destination;
    }

    /**
     * get nested key from an object
     * @param srcObj --> This is an object from which key is required. Assume srcObj = a: { name: 'rishabh', address: { country: 'India' } }
     * @param key --> This is nested key, nesting is defined with dot (.). Assume nested key is 'address.country'
     * With Above two assumtions this method will return "India".
     */
    public static getNestedValue(srcObj: any, key: string): any {
        if (this.isDefined(srcObj)) {
            const nestedKeys: string[] = key.split('.');
            let value = srcObj;
            for (let i = 0; i < nestedKeys.length; i++) {
                if (value) {
                    value = value[nestedKeys[i]];
                } else {
                    break;
                }
            }
            return value;
        }
        return undefined;
    }
    /** end get nested value */
    /**
     *
     * @param srcObj = Object in which key is to be assigned
     * @param key = single key with dot separated which needs to be assigned in nested way
     * @param value = this is the value that needs to assign at that nested level
     * Example = key srcObj is undefined, key is user.name and value is 'test',, then after this method execution
     * srcObj will become { user: { name: 'test' } }
     */
    public static assignNestedKeyValues(srcObj: any = {}, key: string, value: any): void {
        const jsonString = StringUtils.writeNestedJSON(key, value);
        return this.assign(srcObj, JSONUtils.parse(jsonString));
    }
    /** end nested key assignment */

    /** is object defined */
    public static isDefined(obj: any): boolean {
        if (this.isString(obj)) {
            return StringUtils.isDefined(obj);
        }
        return !(!obj || typeof obj === 'undefined' || obj === null);
    }
    /** end object defined method */
    public static isUnDefined(obj: any): boolean {
        return !this.isDefined(obj);
    }
}
