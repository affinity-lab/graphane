import {Formatter} from "./formatter/formatter";
import {Writer} from "./writer/writer";


export enum LOGLEVEL {DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT, EMERGENCY}

export class Logger {

	protected writers: Writer[] = [];
	protected formatters: Formatter[] = [];
	protected parent: Logger | undefined;
	protected name: string = "MAIN";

	constructor(
		protected level: LOGLEVEL = LOGLEVEL.DEBUG,
		writers: Writer | Writer[] = [],
		formatters: Formatter | Formatter[] = []
	) {
		this.formatters = Array.isArray(formatters) ? formatters : [formatters];
		this.writers = Array.isArray(writers) ? writers : [writers];
	};

	public debug(message: any): void {this.log(LOGLEVEL.DEBUG, message);};
	public info(message: any): void {this.log(LOGLEVEL.INFO, message);};
	public notice(message: any): void {this.log(LOGLEVEL.NOTICE, message);};
	public warning(message: any): void {this.log(LOGLEVEL.WARNING, message);};
	public error(message: any): void {this.log(LOGLEVEL.ERROR, message);};
	public critical(message: any): void {this.log(LOGLEVEL.CRITICAL, message);};
	public alert(message: any): void {this.log(LOGLEVEL.ALERT, message);};
	public emergency(message: any): void {this.log(LOGLEVEL.EMERGENCY, message);};

	createSubLogger(name: string, writers: Writer | Writer[] = [], formatters: Formatter | Formatter[] = []): Logger {
		let subLogger = new Logger(
			this.level,
			writers,
			[...(Array.isArray(formatters) ? formatters : [formatters]), ...this.formatters]
		);
		subLogger.parent = this;
		subLogger.name = name;
		return subLogger;
	};

	protected decorator(level: LOGLEVEL, formatted: string, origin: string[]): string {
		return `[${LOGLEVEL[level]}]\t${new Date().toISOString()} ${origin.length ? "<" + origin.join(":") : ""}> ${formatted} `;
	};

	protected format(level: LOGLEVEL, message: any, origin: string[]): string {
		let formatted;
		for (const formatter of this.formatters) {
			formatted = formatter.format(message);
			if (formatted !== undefined) {
				break;
			}
		}
		return this.decorator(level, formatted === undefined ? "unknown log message" : formatted, origin);
	};

	protected write(level: LOGLEVEL, message: any, origin: string[]): void {
		let formatted: string = this.format(level, message, origin);
		this.writers.forEach((writer: Writer): void => {
			if (level >= writer.level) {
				writer.write(formatted, level, message);
			}
		});
	};

	protected log(level: LOGLEVEL, message: any, origin: string[] = []): void {
		if (level >= this.level) {
			this.write(level, message, origin);
		}
		if (this.parent !== undefined) {
			origin.push(this.name);
			if (level >= this.parent.level) {
				this.parent.log(level, message, origin);
			}
		}
	};
}
