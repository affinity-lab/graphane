"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fatal_1 = __importDefault(require("../error/fatal"));
/** A decorator function that materializes a getter property into a value property after the first access. */
function MaterializeIt() {
    return function (target, name, descriptor) {
        const getter = descriptor.get;
        if (!getter) {
            throw (0, fatal_1.default)("Getter property descriptor expected when materializing", { name: target.name, property: name });
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
exports.default = MaterializeIt;
