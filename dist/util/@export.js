"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilTypes = exports.requiredProperties = exports.objectValuesRecursive = exports.MaterializeIt = exports.Geometry = exports.FileDescriptor = void 0;
var file_descriptor_1 = require("./file-descriptor");
Object.defineProperty(exports, "FileDescriptor", { enumerable: true, get: function () { return __importDefault(file_descriptor_1).default; } });
exports.Geometry = __importStar(require("./geometry"));
var materialize_it_1 = require("./materialize-it");
Object.defineProperty(exports, "MaterializeIt", { enumerable: true, get: function () { return __importDefault(materialize_it_1).default; } });
var object_values_recursive_1 = require("./object-values-recursive");
Object.defineProperty(exports, "objectValuesRecursive", { enumerable: true, get: function () { return __importDefault(object_values_recursive_1).default; } });
var required_properties_1 = require("./required-properties");
Object.defineProperty(exports, "requiredProperties", { enumerable: true, get: function () { return __importDefault(required_properties_1).default; } });
exports.UtilTypes = __importStar(require("./types"));
