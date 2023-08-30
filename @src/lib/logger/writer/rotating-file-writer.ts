import * as fs from "fs";
import * as Path from "path";
import {createStream, Generator, RotatingFileStream} from "rotating-file-stream";
import {LOGLEVEL} from "../logger";
import Writer from "./writer";


export  type StreamOptions = {
	size: string,
	interval: string,
	compress: string
}

export default class RotatingFileWriter extends Writer {
	private stream: RotatingFileStream;

	constructor(
		readonly level: LOGLEVEL = LOGLEVEL.DEBUG,
		readonly path: string,
		readonly archivePath: string,
		readonly streamOptions: StreamOptions
	) {
		super(level);
		this.stream = createStream(this.generator(), this.streamOptions);
	};

	static createRotatingFileWriterFactory({basePath, archivePath, streamOptions}: {
		basePath: string,
		archivePath: string,
		streamOptions: StreamOptions
	}) {
		return (level: LOGLEVEL, path: string) => {
			fs.mkdirSync(Path.dirname(basePath + "/" + path), {recursive: true});
			fs.mkdirSync(Path.dirname(archivePath + "/" + path), {recursive: true});
			return new RotatingFileWriter(level, basePath + "/" + path, archivePath + "/" + path, streamOptions);
		};
	};

	write(formatted: string): void {
		this.stream.write(formatted + "\n");
	};

	generator(): Generator {
		return (time: number | Date, index?: number): string => {
			if (!(time && index)) {
				return `${this.path}.log`;
			}
			time = time as Date;
			return `${this.archivePath}/${time.getFullYear().toString()}-${(time.getMonth() + 1).toString().padStart(2, "0")}-${(time.getDate()).toString().padStart(2, "0")}-${index}`;
		};
	};
}
