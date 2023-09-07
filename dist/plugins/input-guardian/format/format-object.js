"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatObject = void 0;
function formatObject(object) {
    if (typeof object !== "object")
        return;
    for (const i in object) {
        if (Reflect.hasMetadata("format", object, i)) {
            let formatters = Reflect.getMetadata("format", object, i);
            formatters.forEach((formatter) => object[i] = formatter(object[i]));
        }
    }
}
exports.formatObject = formatObject;
