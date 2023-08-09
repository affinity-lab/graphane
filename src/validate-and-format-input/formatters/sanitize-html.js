"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const create_formatter_1 = __importDefault(require("../format/create-formatter"));
function SanitizeHTML(target, key) {
    (0, create_formatter_1.default)(target, key, (text) => (0, sanitize_html_1.default)(text, { allowedTags: [] }));
}
exports.default = SanitizeHTML;
