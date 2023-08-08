import {LOGLEVEL} from "../logger";


export default abstract class Writer {
    constructor(readonly level: LOGLEVEL = LOGLEVEL.DEBUG) {
    };

    abstract write(formatted: string, level: LOGLEVEL, message: any): void;
}
