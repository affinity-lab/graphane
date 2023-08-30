"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../error/error"));
const preprocess_error_tree_1 = __importDefault(require("../error/preprocess-error-tree"));
const GraphaneError = {
    application: {
        notFound: () => (0, error_1.default)(),
        alreadyRegistered: (app) => (0, error_1.default)({ app })
    },
    module: {
        notFound: () => (0, error_1.default)(),
        alreadyRegistered: (module) => (0, error_1.default)({ module })
    },
    crud: {
        unrealEntityTarget: (target) => (0, error_1.default)({ target }),
        badRelationType: () => (0, error_1.default)()
    }
};
(0, preprocess_error_tree_1.default)(GraphaneError, "GRAPHANE");
exports.default = GraphaneError;
