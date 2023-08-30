"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectValuesRecursive = void 0;
/**
 * Recursively extracts values from an object's properties, including nested objects.
 * Returns the values in a flattened array. If input is not an object, it's returned as a single-element array.
 *
 * @param {Object} obj - The input object to extract values from.
 * @returns {Array} An array containing all extracted values.
 */
function objectValuesRecursive(obj) {
    if (typeof obj === "object") {
        let arr = [...Object.values(obj).map((item) => objectValuesRecursive(item))];
        return arr.reduce((accumulator, value) => accumulator.concat(value), []);
    }
    return obj;
}
exports.objectValuesRecursive = objectValuesRecursive;
