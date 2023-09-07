"use strict";
/**
 * Checks if the specified properties are defined and not undefined in the given object.
 *
 * @template T The type of the object being checked.
 * @param {T | undefined} obj The object to check the properties in.
 * @param {...keyof T} required List of required property names to check.
 * @returns {undefined | boolean} Returns `undefined` if the input object is `undefined`.
 *                                Returns `false` if any of the required properties are `undefined`.
 *                                Returns `true` if all required properties are defined.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredProperties = void 0;
function requiredProperties(obj, ...required) {
    if (typeof obj === "undefined")
        return undefined;
    for (const name of required)
        if (typeof obj[name] === "undefined")
            return false;
    return true;
}
exports.requiredProperties = requiredProperties;
