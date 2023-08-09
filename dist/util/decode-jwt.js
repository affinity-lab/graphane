"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = require("jwt-simple");
function decodeJWT(token, secret, algorithm = "HS512") {
    if (typeof token === "undefined") {
        return undefined;
    }
    try {
        return (0, jwt_simple_1.decode)(token, secret, false, algorithm);
    }
    catch (e) {
        return undefined;
    }
}
exports.default = decodeJWT;
