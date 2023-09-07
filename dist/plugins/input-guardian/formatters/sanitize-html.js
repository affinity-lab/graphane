"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeHTML = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const create_formatter_1 = require("../format/create-formatter");
const input_guardian_error_1 = require("../input-guardian-error");
function SanitizeHTML(target, key) {
    (0, create_formatter_1.createFormatter)(target, key, (text) => {
        const clear = (0, sanitize_html_1.default)(text, { allowedTags: [] });
        if (clear !== text)
            throw input_guardian_error_1.InputGuardianError.sanitization(`${target}'s ${key} got unsanitary input: ${text}`, { target, key, text });
        return clear;
    });
}
exports.SanitizeHTML = SanitizeHTML;
