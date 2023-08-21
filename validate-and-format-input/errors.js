"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const error_1 = __importDefault(require("../error/error"));
const validation = (message, fields) => (0, error_1.default)({ fields }, message);
exports.validation = validation;
