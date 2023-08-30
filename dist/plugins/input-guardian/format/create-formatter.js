"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFormatter = void 0;
function createFormatter(target, key, fn) {
    if (!Reflect.hasMetadata("format", target, key)) {
        Reflect.defineMetadata("format", [], target, key);
    }
    let metadata = Reflect.getMetadata("format", target, key);
    let formatter = (value) => {
        if (typeof value === "undefined") {
            return value;
        }
        else if (Array.isArray(value)) {
            return value.map((text) => fn(text));
        }
        else if (typeof value === "string") {
            return fn(value);
        }
        else if (typeof value === "number") {
            return value;
        }
        else {
            const rObject = {};
            for (let key in value) {
                rObject[fn(key)] = formatter(value);
            }
            return rObject;
        }
    };
    metadata.push(formatter);
}
exports.createFormatter = createFormatter;
