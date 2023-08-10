"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const application_already_registered_error_1 = __importDefault(require("./errors/application-already-registered-error"));
const prefixed_application_1 = require("./prefixed-application");
class Application {
    constructor(id, code, secret, name, roles, logger = undefined, authorizeFunctions = []) {
        this.id = id;
        this.code = code;
        this.secret = secret;
        this.name = name;
        this.roles = roles;
        this.authorizeFunctions = authorizeFunctions;
        this.code = this.code.toUpperCase();
        this.logger = typeof logger === "function" ? logger(this) : logger;
        this.px = new prefixed_application_1.PrefixedApplication(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey);
        }
        Application.addApplication(this);
    }
    ;
    static addApplication(application) {
        if (this.codeMap.hasOwnProperty(application.code)) {
            throw new application_already_registered_error_1.default(application.code);
        }
        this.applications.push(application);
        this.codeMap[application.code] = application;
        this.idMap[application.id] = application;
    }
    ;
    async authorize(req) {
        let result;
        for (const authorizeFunction of this.authorizeFunctions) {
            result = await authorizeFunction(req, this);
            if (result !== false) {
                return result;
            }
        }
        return undefined;
    }
    ;
}
_a = Application;
Application.applications = [];
Application.codeMap = {};
Application.idMap = {};
Application.get = {
    byCode: (code) => _a.codeMap.hasOwnProperty(code) ? _a.codeMap[code] : undefined,
    byId: (id) => {
        return _a.idMap.hasOwnProperty(id) ? _a.idMap[id] : undefined;
    }
};
exports.default = Application;
