"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("@src/error/graphane-error"));
function MaterializeIt() {
    return function (target, name, descriptor) {
        const getter = descriptor.get;
        if (!getter) {
            throw graphane_error_1.default.fatal("Getter property descriptor expected when materializing", { name: target.name, property: name });
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
