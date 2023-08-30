"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_error_data_1 = __importDefault(require("../../error/create-error-data"));
const preprocess_error_tree_1 = __importDefault(require("../../error/preprocess-error-tree"));
const AttachmentError = {
    upload: {
        badToken: () => (0, create_error_data_1.default)(),
        failed: (message) => (0, create_error_data_1.default)(undefined, message),
        validation: {
            tooManyAttachments: (count) => (0, create_error_data_1.default)({ count }),
            tooLarge: (size) => (0, create_error_data_1.default)({ size }),
            mimeTypeMismatch: (pattern) => (0, create_error_data_1.default)({ pattern })
        }
    },
    imageExpected: () => (0, create_error_data_1.default)(),
    fileCrud: {
        badInput: (err) => (0, create_error_data_1.default)({ error: err }),
        unknownCommand: (err) => (0, create_error_data_1.default)({ command: err }),
        fileNotExists: () => (0, create_error_data_1.default)(),
        fileAlreadyExists: (name) => (0, create_error_data_1.default)({ name })
    }
};
(0, preprocess_error_tree_1.default)(AttachmentError, "ATTACHMENT");
exports.default = AttachmentError;
