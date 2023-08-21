import { Generator } from "rotating-file-stream";
import { LOGLEVEL } from "../logger";
import Writer from "./writer";
export type StreamOptions = {
    size: string;
    interval: string;
    compress: string;
};
export default class RotatingFileWriter extends Writer {
    readonly level: LOGLEVEL;
    readonly path: string;
    readonly archivePath: string;
    readonly streamOptions: StreamOptions;
    private stream;
    constructor(level: LOGLEVEL, path: string, archivePath: string, streamOptions: StreamOptions);
    static createRotatingFileWriterFactory({ basePath, archivePath, streamOptions }: {
        basePath: string;
        archivePath: string;
        streamOptions: StreamOptions;
    }): (level: LOGLEVEL, path: string) => RotatingFileWriter;
    write(formatted: string): void;
    generator(): Generator;
}
