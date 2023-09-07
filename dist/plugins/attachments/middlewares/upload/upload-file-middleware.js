"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileMiddleware = void 0;
const attachment_error_1 = require("../../attachment-error");
const isEligibleRequest = require("express-fileupload/lib/isEligibleRequest");
const processMultipart = require("express-fileupload/lib/processMultipart.js");
function uploadFileMiddleware(fileUploadConfig) {
    return (req, res, next) => {
        if (!isEligibleRequest(req)) {
            throw attachment_error_1.AttachmentError.upload.failed("Bad upload request");
        }
        else {
            processMultipart(fileUploadConfig, req, res, next);
        }
    };
}
exports.uploadFileMiddleware = uploadFileMiddleware;
