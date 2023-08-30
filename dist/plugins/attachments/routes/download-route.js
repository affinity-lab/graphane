"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resolve_file_location_middleware_1 = __importDefault(require("../middlewares/download/resolve-file-location-middleware"));
const file_not_found_middleware_1 = __importDefault(require("../middlewares/download/file-not-found-middleware"));
function downloadRoute(app, endpoint, fileStoragePath, fileMaxAge) {
    app.use(resolve_file_location_middleware_1.default.route(endpoint), express_1.default.Router({ mergeParams: true }).use((0, resolve_file_location_middleware_1.default)(), express_1.default.static(fileStoragePath, { maxAge: fileMaxAge }), (0, file_not_found_middleware_1.default)()));
}
exports.default = downloadRoute;
