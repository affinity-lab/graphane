import {Writer} from "./writer";


export class ConsoleWriter extends Writer {
	write(formatted: string): void {
		console.log(`${formatted}`);
	};
}
