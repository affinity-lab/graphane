"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgDownloadRoute = void 0;
const express_1 = __importDefault(require("express"));
const resolve_img_location_middleware_1 = require("../middlewares/img/resolve-img-location-middleware");
const img_not_found_middleware_1 = require("../middlewares/img/img-not-found-middleware");
function imgDownloadRoute(app, endpoint, fileStoragePath, imgStoragePath, imgMaxAge) {
    app.use(resolve_img_location_middleware_1.resolveImgLocationMiddleware.route(endpoint), express_1.default.Router({ mergeParams: true }).use((0, resolve_img_location_middleware_1.resolveImgLocationMiddleware)(imgStoragePath), express_1.default.static(imgStoragePath, { maxAge: imgMaxAge }), (0, img_not_found_middleware_1.imgNotFoundMiddleware)(fileStoragePath, imgStoragePath)));
}
exports.imgDownloadRoute = imgDownloadRoute;
