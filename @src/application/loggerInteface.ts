export default interface LoggerInterface {
    debug(message: any): void;

    info(message: any): void;

    notice(message: any): void;

    warning(message: any): void;

    error(message: any): void;

    critical(message: any): void;

    alert(message: any): void;

    emergency(message: any): void;
}
