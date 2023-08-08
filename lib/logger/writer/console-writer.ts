import Writer from "./writer";


export default class ConsoleWriter extends Writer {
    write(formatted: string): void {
        console.log(`${formatted}`);
    };
}
