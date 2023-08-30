"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LOGLEVEL = void 0;
var LOGLEVEL;
(function (LOGLEVEL) {
    LOGLEVEL[LOGLEVEL["DEBUG"] = 0] = "DEBUG";
    LOGLEVEL[LOGLEVEL["INFO"] = 1] = "INFO";
    LOGLEVEL[LOGLEVEL["NOTICE"] = 2] = "NOTICE";
    LOGLEVEL[LOGLEVEL["WARNING"] = 3] = "WARNING";
    LOGLEVEL[LOGLEVEL["ERROR"] = 4] = "ERROR";
    LOGLEVEL[LOGLEVEL["CRITICAL"] = 5] = "CRITICAL";
    LOGLEVEL[LOGLEVEL["ALERT"] = 6] = "ALERT";
    LOGLEVEL[LOGLEVEL["EMERGENCY"] = 7] = "EMERGENCY";
})(LOGLEVEL || (exports.LOGLEVEL = LOGLEVEL = {}));
class Logger {
    constructor(level = LOGLEVEL.DEBUG, writers = [], formatters = []) {
        this.level = level;
        this.writers = [];
        this.formatters = [];
        this.name = "MAIN";
        this.formatters = Array.isArray(formatters) ? formatters : [formatters];
        this.writers = Array.isArray(writers) ? writers : [writers];
    }
    ;
    debug(message) { this.log(LOGLEVEL.DEBUG, message); }
    ;
    info(message) { this.log(LOGLEVEL.INFO, message); }
    ;
    notice(message) { this.log(LOGLEVEL.NOTICE, message); }
    ;
    warning(message) { this.log(LOGLEVEL.WARNING, message); }
    ;
    error(message) { this.log(LOGLEVEL.ERROR, message); }
    ;
    critical(message) { this.log(LOGLEVEL.CRITICAL, message); }
    ;
    alert(message) { this.log(LOGLEVEL.ALERT, message); }
    ;
    emergency(message) { this.log(LOGLEVEL.EMERGENCY, message); }
    ;
    createSubLogger(name, writers = [], formatters = []) {
        let subLogger = new Logger(this.level, writers, [...(Array.isArray(formatters) ? formatters : [formatters]), ...this.formatters]);
        subLogger.parent = this;
        subLogger.name = name;
        return subLogger;
    }
    ;
    decorator(level, formatted, origin) {
        return `[${LOGLEVEL[level]}]\t${new Date().toISOString()} ${origin.length ? "<" + origin.join(":") : ""}> ${formatted} `;
    }
    ;
    format(level, message, origin) {
        let formatted;
        for (const formatter of this.formatters) {
            formatted = formatter.format(message);
            if (formatted !== undefined) {
                break;
            }
        }
        return this.decorator(level, formatted === undefined ? "unknown log message" : formatted, origin);
    }
    ;
    write(level, message, origin) {
        let formatted = this.format(level, message, origin);
        this.writers.forEach((writer) => {
            if (level >= writer.level) {
                writer.write(formatted, level, message);
            }
        });
    }
    ;
    log(level, message, origin = []) {
        if (level >= this.level) {
            this.write(level, message, origin);
        }
        if (this.parent !== undefined) {
            origin.push(this.name);
            if (level >= this.parent.level) {
                this.parent.log(level, message, origin);
            }
        }
    }
    ;
}
exports.Logger = Logger;
