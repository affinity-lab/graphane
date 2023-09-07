import { Formatter } from "./formatter/formatter";
import { Writer } from "./writer/writer";
export declare enum LOGLEVEL {
    DEBUG = 0,
    INFO = 1,
    NOTICE = 2,
    WARNING = 3,
    ERROR = 4,
    CRITICAL = 5,
    ALERT = 6,
    EMERGENCY = 7
}
export declare class Logger {
    protected level: LOGLEVEL;
    protected writers: Writer[];
    protected formatters: Formatter[];
    protected parent: Logger | undefined;
    protected name: string;
    constructor(level?: LOGLEVEL, writers?: Writer | Writer[], formatters?: Formatter | Formatter[]);
    debug(message: any): void;
    info(message: any): void;
    notice(message: any): void;
    warning(message: any): void;
    error(message: any): void;
    critical(message: any): void;
    alert(message: any): void;
    emergency(message: any): void;
    createSubLogger(name: string, writers?: Writer | Writer[], formatters?: Formatter | Formatter[]): Logger;
    protected decorator(level: LOGLEVEL, formatted: string, origin: string[]): string;
    protected format(level: LOGLEVEL, message: any, origin: string[]): string;
    protected write(level: LOGLEVEL, message: any, origin: string[]): void;
    protected log(level: LOGLEVEL, message: any, origin?: string[]): void;
}
