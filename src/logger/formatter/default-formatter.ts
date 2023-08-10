import Formatter from "./formatter";


export default class DefaultFormatter extends Formatter {
    format(message: any): string {
        if (typeof message === "string") {
            return message;
        }
        try {
            return JSON.stringify(message);
        } catch (e) {
            return "Cannot stringify message to be logged.";
        }
    };
}
