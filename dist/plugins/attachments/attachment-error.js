"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentError = void 0;
const create_error_data_1 = require("../../error/create-error-data");
const preprocess_error_tree_1 = require("../../error/preprocess-error-tree");
exports.AttachmentError = {
    upload: {
        badToken: () => (0, create_error_data_1.createErrorData)(),
        failed: (message) => (0, create_error_data_1.createErrorData)(undefined, message),
        validation: {
            tooManyAttachments: (count) => (0, create_error_data_1.createErrorData)({ count }),
            tooLarge: (size) => (0, create_error_data_1.createErrorData)({ size }),
            mimeTypeMismatch: (pattern) => (0, create_error_data_1.createErrorData)({ pattern })
        }
    },
    imageExpected: () => (0, create_error_data_1.createErrorData)(),
    fileCrud: {
        badInput: (err) => (0, create_error_data_1.createErrorData)({ error: err }),
        unknownCommand: (err) => (0, create_error_data_1.createErrorData)({ command: err }),
        fileNotExists: () => (0, create_error_data_1.createErrorData)(),
        fileAlreadyExists: (name) => (0, create_error_data_1.createErrorData)({ name })
    }
};
(0, preprocess_error_tree_1.preprocessErrorTree)(exports.AttachmentError, "ATTACHMENT");
