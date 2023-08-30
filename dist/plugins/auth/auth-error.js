"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const create_error_data_1 = require("../../error/create-error-data");
const preprocess_error_tree_1 = require("../../error/preprocess-error-tree");
exports.AuthError = {
    unauthorized: () => (0, create_error_data_1.createErrorData)(undefined, undefined, 401),
    forbidden: () => (0, create_error_data_1.createErrorData)(undefined, undefined, 403),
    alreadyLoggedIn: () => (0, create_error_data_1.createErrorData)(undefined, undefined, 403)
};
(0, preprocess_error_tree_1.preprocessErrorTree)(exports.AuthError, "AUTH");
