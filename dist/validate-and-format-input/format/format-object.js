"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatObject(object) {
    for (const i in object) {
        if (Reflect.hasMetadata("format", object, i)) {
            let formatters = Reflect.getMetadata("format", object, i);
            formatters.forEach((formatter) => object[i] = formatter(object[i]));
        }
    }
}
exports.default = formatObject;
