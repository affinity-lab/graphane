"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGuardianError = void 0;
const create_error_data_1 = require("../../error/create-error-data");
const preprocess_error_tree_1 = require("../../error/preprocess-error-tree");
exports.InputGuardianError = {
    validation: (message, fields) => (0, create_error_data_1.createErrorData)({ fields }, message),
    sanitization: (message, info) => (0, create_error_data_1.createErrorData)(info, message)
};
(0, preprocess_error_tree_1.preprocessErrorTree)(exports.InputGuardianError, "INPUT_GUARDIAN");
