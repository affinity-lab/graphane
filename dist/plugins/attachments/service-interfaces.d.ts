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
