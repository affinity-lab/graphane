"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachment_error_1 = __importDefault(require("../../attachment-error"));
const isEligibleRequest = require("express-fileupload/lib/isEligibleRequest");
const processMultipart = require("express-fileupload/lib/processMultipart.js");
function uploadFileMiddleware(fileUploadConfig) {
    return (req, res, next) => {
        if (!isEligibleRequest(req)) {
            throw attachment_error_1.default.upload.failed("Bad upload request");
        }
        else {
            processMultipart(fileUploadConfig, req, res, next);
        }
    };
}
exports.default = uploadFileMiddleware;
