"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const graphane_error_1 = require("../graphane-error");
const prefixed_application_1 = require("./prefixed-application");
const required_properties_1 = require("../../util/required-properties");
const fatal_error_1 = require("../../error/fatal-error");
class Application {
    static addApplication(application) {
        if (this.codeMap.hasOwnProperty(application.code)) {
            throw graphane_error_1.GraphaneError.application.alreadyRegistered(application.code);
        }
        this.applications.push(application);
        this.codeMap[application.code] = application;
        this.idMap[application.id] = application;
    }
    ;
    static cfg(env, code) {
        if (code === undefined)
            code = env.string("CODE");
        return {
            app: {
                id: env.string("ID"),
                code,
                secret: env.string("SECRET"),
                name: env.string("NAME", code)
            }
        };
    }
    ;
    constructor(cfg, roles, logger = undefined, jwtFactory, middlewares = []) {
        this.cfg = cfg;
        this.roles = roles;
        this.jwtFactory = jwtFactory;
        this.middlewares = middlewares;
        if (!(0, required_properties_1.requiredProperties)(cfg, "app") || !(0, required_properties_1.requiredProperties)(cfg.app, "code", "id", "secret", "name"))
            throw (0, fatal_error_1.fatalError)(`App config does not have the required keys`);
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
    ;
    async runMiddlewares(req) { for (const middleware of this.middlewares)
        await middleware(req, this); }
    ;
}
exports.Application = Application;
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
