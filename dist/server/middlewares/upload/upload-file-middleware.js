"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEligibleRequest = require("express-fileupload/lib/isEligibleRequest");
const processMultipart = require("express-fileupload/lib/processMultipart.js");
function uploadFileMiddleware(logger, fileUploadConfig) {
    return (req, res, next) => {
        if (!isEligibleRequest(req)) {
            logger.notice({ req, msg: "Bad upload request" });
            res.status(400).json("Bad upload request");
        }
        else {
            processMultipart(fileUploadConfig, req, res, next);
        }
    };
}
exports.default = uploadFileMiddleware;
