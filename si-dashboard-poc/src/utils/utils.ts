export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

class Utils {
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
          const keys: Array<string> = Utils.getKeys(json);
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
}

Utils.install();

export default Utils;
