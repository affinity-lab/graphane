"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_formatter_1 = __importDefault(require("../format/create-formatter"));
function FormatPhone(target, key) {
    (0, create_formatter_1.default)(target, key, (text) => {
        return text.replace(/[+\-\/]/, "");
    });
}
exports.default = FormatPhone;
