"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_data_1 = __importDefault(require("../../error/create-error-data"));
const preprocess_error_tree_1 = __importDefault(require("../../error/preprocess-error-tree"));
const AuthError = {
    unauthorized: () => (0, create_error_data_1.default)(undefined, undefined, 401),
    forbidden: () => (0, create_error_data_1.default)(undefined, undefined, 403),
    alreadyLoggedIn: () => (0, create_error_data_1.default)(undefined, undefined, 403)
};
(0, preprocess_error_tree_1.default)(AuthError, "AUTH");
exports.default = AuthError;
