"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../graphane-error"));
const prefixed_application_1 = require("./prefixed-application");
const required_properties_1 = __importDefault(require("../../util/required-properties"));
const fatal_1 = __importDefault(require("../../error/fatal"));
class Application {
    static addApplication(application) {
        if (this.codeMap.hasOwnProperty(application.code)) {
            throw graphane_error_1.default.application.alreadyRegistered(application.code);
        }
        this.applications.push(application);
        this.codeMap[application.code] = application;
        this.idMap[application.id] = application;
    }
    static cfg(env, code) {
        code = env.string("CODE", code);
        return {
            app: {
                id: env.string("ID"),
                code: code,
                secret: env.string("SECRET"),
                name: env.string("NAME", code)
            }
        };
    }
    constructor(cfg, roles, logger = undefined, jwtFactory, middlewares = []) {
        this.cfg = cfg;
        this.roles = roles;
        this.jwtFactory = jwtFactory;
        this.middlewares = middlewares;
        if (!(0, required_properties_1.default)(cfg, "app") || !(0, required_properties_1.default)(cfg.app, "code", "id", "secret", "name"))
            throw (0, fatal_1.default)(`App config does not have the required keys`);
        this.code = cfg["app"]["code"].toUpperCase();
        this.id = cfg["app"]["id"];
        this.secret = cfg["app"]["secret"];
        this.name = cfg["app"]["name"];
        this.logger = typeof logger === "function" ? logger(this) : logger;
        this.px = new prefixed_application_1.PrefixedApplication(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey);
        }
        this.jwt = this.jwtFactory(this.secret);
        _a.addApplication(this);
    }
    async runMiddlewares(req) { for (const middleware of this.middlewares)
        middleware(req, this); }
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
