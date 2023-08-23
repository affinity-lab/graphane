"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectValuesRecursive = void 0;
const objectValuesRecursive = (obj) => {
    if (typeof obj === "object") {
        let arr = [
            ...Object.values(obj).map((item) => (0, exports.objectValuesRecursive)(item))
        ];
        return arr.reduce((accumulator, value) => accumulator.concat(value), []);
    }
    return obj;
};
exports.objectValuesRecursive = objectValuesRecursive;
