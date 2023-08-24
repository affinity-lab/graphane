import { LOGLEVEL } from "../logger";
export default abstract class Writer {
    readonly level: LOGLEVEL;
    constructor(level?: LOGLEVEL);
    abstract write(formatted: string, level: LOGLEVEL, message: any): void;
}
