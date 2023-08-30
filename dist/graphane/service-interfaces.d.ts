import Application from "./application/application";
import Module from "./module/module";
export interface Jwt<T> {
    decode(token: string | undefined): T | undefined;
    encode(payload: T, expires?: string): string | undefined;
}
export type JwtFactory = <T>(secret: string) => Jwt<T>;
export interface Logger {
    debug(message: any): void;
    info(message: any): void;
    notice(message: any): void;
    warning(message: any): void;
    error(message: any): void;
    critical(message: any): void;
    alert(message: any): void;
    emergency(message: any): void;
}
export type ApplicationLoggerFactory = (app: Application<any>) => Logger;
export type ModuleLoggerFactory = (app: Module<any>) => Logger;
export interface Env {
    string(key: string, defaultValue?: string): string;
    path(key: string, defaultValue?: string): string;
    int(key: string, defaultValue?: number): number;
    float(key: string, defaultValue?: number): number;
    boolean(key: string, defaultValue?: boolean): boolean;
}
export interface Storage<T> {
    set(key: string, value: T): void;
    get(key?: string): T | undefined;
    getOrFail(key?: string): T | never;
}
