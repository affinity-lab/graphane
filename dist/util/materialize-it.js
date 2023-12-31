"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterializeIt = void 0;
const fatal_error_1 = require("../error/fatal-error");
/** A decorator function that materializes a getter property into a value property after the first access. */
function MaterializeIt() {
    return function (target, name, descriptor) {
        const getter = descriptor.get;
        if (!getter) {
            throw (0, fatal_error_1.fatalError)("Getter property descriptor expected when materializing", { name: target.name, property: name });
        }
        descriptor.get = function () {
            const value = getter.call(this);
            Object.defineProperty(this, name, {
                configurable: descriptor.configurable,
                enumerable: descriptor.enumerable,
                writable: false,
                value
            });
            return value;
        };
    };
}
exports.MaterializeIt = MaterializeIt;
