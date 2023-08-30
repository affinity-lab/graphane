"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeHTML = exports.FormatPhone = exports.FormatCase = void 0;
require("./init-plugin");
var format_case_1 = require("./formatters/format-case");
Object.defineProperty(exports, "FormatCase", { enumerable: true, get: function () { return __importDefault(format_case_1).default; } });
var format_phone_1 = require("./formatters/format-phone");
Object.defineProperty(exports, "FormatPhone", { enumerable: true, get: function () { return __importDefault(format_phone_1).default; } });
var sanitize_html_1 = require("./formatters/sanitize-html");
Object.defineProperty(exports, "SanitizeHTML", { enumerable: true, get: function () { return __importDefault(sanitize_html_1).default; } });
