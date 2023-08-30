"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadRoute = void 0;
const check_file_token_middleware_1 = require("../middlewares/upload/check-file-token-middleware");
const upload_file_middleware_1 = require("../middlewares/upload/upload-file-middleware");
const handle_file_middleware_1 = require("../middlewares/upload/handle-file-middleware");
function createUploadRoute(app, endpoint, uploadOptions, currentAuthorized, jwt) {
    app.use(endpoint, (0, check_file_token_middleware_1.checkFileTokenMiddleware)(jwt, currentAuthorized), (0, upload_file_middleware_1.uploadFileMiddleware)(uploadOptions), (0, handle_file_middleware_1.handleFileMiddleware)());
}
exports.createUploadRoute = createUploadRoute;
