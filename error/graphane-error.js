"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("./error"));
const GraphaneError = {
    fatal: (message, info) => (0, error_1.default)({ message, info }),
    application: {
        notFound: () => (0, error_1.default)(),
        alreadyRegistered: (app) => (0, error_1.default)({ app })
    },
    module: {
        notFound: () => (0, error_1.default)(),
        alreadyRegistered: (module) => (0, error_1.default)({ module })
    },
    input: {
        validation: (message, fields) => (0, error_1.default)({ fields }, message)
    },
    upload: {
        badToken: () => (0, error_1.default)(),
        failed: (message) => (0, error_1.default)(undefined, message),
        validation: {
            tooManyAttachments: (count) => (0, error_1.default)({ count }),
            tooLarge: (size) => (0, error_1.default)({ size }),
            mimeTypeMismatch: (pattern) => (0, error_1.default)({ pattern })
        }
    },
    attachment: {
        imageExpected: () => (0, error_1.default)(),
        fileCrud: {
            badInput: (err) => (0, error_1.default)({ error: err }),
            unknownCommand: (err) => (0, error_1.default)({ command: err }),
            fileNotExists: () => (0, error_1.default)(),
            fileAlreadyExists: (name) => (0, error_1.default)({ name })
        }
    },
    crud: {
        unrealEntityTarget: (target) => (0, error_1.default)({ target }),
        badRelationType: () => (0, error_1.default)()
    },
    guard: {
        unauthorized: () => (0, error_1.default)(undefined, undefined, 401),
        forbidden: () => (0, error_1.default)(undefined, undefined, 403),
        alreadyLoggedIn: () => (0, error_1.default)(undefined, undefined, 403),
        duplicateEmail: () => (0, error_1.default)(undefined, undefined, 403)
    }
};
error_1.default.preprocess(GraphaneError, "GRAPHANE");
exports.default = GraphaneError;
