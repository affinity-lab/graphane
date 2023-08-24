"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = __importDefault(require("console"));
const chalk_1 = __importDefault(require("chalk"));
function logEnvInfo(env) {
    let envInfo = env.info;
    envInfo.sort((a, b) => (a.key > b.key ? 1 : -1));
    const keyLength = Math.max(...envInfo.map((item) => item.key.length));
    envInfo.forEach((info) => console_1.default.log(chalk_1.default.gray(info.type.padEnd(8, " ")) +
        chalk_1.default.bold.green(info.key) +
        " " +
        chalk_1.default
            .rgb(50, 50, 50)
            .italic(".".repeat(keyLength - info.key.length + 2)) +
        (info.defaultValue === undefined ? chalk_1.default.redBright.bold("! ") : "") +
        (info.value === info.defaultValue
            ? chalk_1.default.white(info.value)
            : chalk_1.default.cyanBright(info.value) +
                (info.defaultValue !== undefined
                    ? chalk_1.default.gray(" (" + info.defaultValue + ")")
                    : ""))));
}
exports.default = logEnvInfo;
