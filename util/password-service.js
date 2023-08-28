"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const argon2 = __importStar(require("argon2"));
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
class PasswordService {
    constructor(pepper) {
        this.pepper = pepper;
    }
    ;
    async hashPassword(password) {
        try {
            return await argon2.hash(password, { secret: this.pepper });
        }
        catch (error) {
            throw graphane_error_1.default.fatal("error while hashing password", { error });
        }
    }
    async verifyPassword(hashedPassword, enteredPassword) {
        try {
            return await argon2.verify(hashedPassword, enteredPassword, { secret: this.pepper });
        }
        catch (error) {
            throw graphane_error_1.default.fatal("error while verifying password", { error });
        }
    }
}
exports.PasswordService = PasswordService;
