"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const failed_to_materialize_error_1 = __importDefault(require("./failed-to-materialize-error"));
function MaterializeIt() {
    return function (target, name, descriptor) {
        const getter = descriptor.get;
        if (!getter) {
            throw new failed_to_materialize_error_1.default("Getter property descriptor expected");
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
