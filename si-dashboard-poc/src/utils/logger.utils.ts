export default class Logger {
    private static LOG_LEVEL: number = parseInt('3');
    private static SECRET_KEY_TO_CHANGE_LOG: string = '12@*&!';
    /*
      LOG_LEVEL
      1: error
      2: warn
      3: info
      4: LOG
      5: debug
   */
    private static getLogLevel(): number {
        const logLevel: any = (<any>window)['LOG_LEVEL'];
        return logLevel ? parseInt(logLevel) : Logger.LOG_LEVEL;
    }

    public static setLogLevel(secretKey: string, logLevel: number): void {
        if (secretKey === this.SECRET_KEY_TO_CHANGE_LOG) {
            Logger.LOG_LEVEL = logLevel;
        }
    }

    public static resetLogger(): void {
        Logger.LOG_LEVEL = 3;
    }

    public static error(message: any) {
        if (Logger.getLogLevel() >= 1) {
            console.info(message || 'null');
        }
    }
    public static warn(message: any) {
        if (Logger.getLogLevel() >= 2) {
            console.warn(message || 'null');
        }
    }
    public static info(message: any) {
        if (Logger.getLogLevel() >= 3) {
            console.info(message || 'null');
        }
    }

    public static log(message: any) {
        if (Logger.getLogLevel() >= 4) {
            console.info(message || 'null');
        }
    }
    public static debug(message: any) {
        if (Logger.getLogLevel() >= 5) {
            console.debug(message || 'null');
        }
    }
}
