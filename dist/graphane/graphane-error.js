"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphaneError = void 0;
const create_error_data_1 = require("../error/create-error-data");
const preprocess_error_tree_1 = require("../error/preprocess-error-tree");
exports.GraphaneError = {
    application: {
        notFound: () => (0, create_error_data_1.createErrorData)(),
        alreadyRegistered: (app) => (0, create_error_data_1.createErrorData)({ app })
    },
    module: {
        notFound: () => (0, create_error_data_1.createErrorData)(),
        alreadyRegistered: (module) => (0, create_error_data_1.createErrorData)({ module })
    },
    crud: {
        unrealEntityTarget: (target) => (0, create_error_data_1.createErrorData)({ target }),
        badRelationType: () => (0, create_error_data_1.createErrorData)()
    }
};
(0, preprocess_error_tree_1.preprocessErrorTree)(exports.GraphaneError, "GRAPHANE");
