"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_data_1 = __importDefault(require("../../error/create-error-data"));
const preprocess_error_tree_1 = __importDefault(require("../../error/preprocess-error-tree"));
const InputGuardianError = {
    validation: (message, fields) => (0, create_error_data_1.default)({ fields }, message)
};
(0, preprocess_error_tree_1.default)(InputGuardianError, "INPUT_GUARDIAN");
exports.default = InputGuardianError;
