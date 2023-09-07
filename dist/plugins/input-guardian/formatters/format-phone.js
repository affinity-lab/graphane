"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatPhone = void 0;
const create_formatter_1 = require("../format/create-formatter");
function FormatPhone(target, key) {
    (0, create_formatter_1.createFormatter)(target, key, (text) => {
        return text.replace(/[+\-\/]/, "");
    });
}
exports.FormatPhone = FormatPhone;
