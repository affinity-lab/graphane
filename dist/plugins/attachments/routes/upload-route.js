"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_file_token_middleware_1 = __importDefault(require("../middlewares/upload/check-file-token-middleware"));
const upload_file_middleware_1 = __importDefault(require("../middlewares/upload/upload-file-middleware"));
const handle_file_middleware_1 = __importDefault(require("../middlewares/upload/handle-file-middleware"));
function createUploadRoute(app, endpoint, uploadOptions, currentAuthorized, jwt) {
    app.use(endpoint, (0, check_file_token_middleware_1.default)(jwt, currentAuthorized), (0, upload_file_middleware_1.default)(uploadOptions), (0, handle_file_middleware_1.default)());
}
exports.default = createUploadRoute;
