"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const graphane_error_1 = require("../graphane-error");
const prefixed_module_1 = require("./prefixed-module");
const required_properties_1 = require("../../util/required-properties");
const fatal_error_1 = require("../../error/fatal-error");
class Module {
    static get(code) { return this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : null; }
    ;
    static addEntity(code, entity) { this.codeMap[code].entities[entity.name] = entity; }
    ;
    static addModule(module) {
        if (this.codeMap.hasOwnProperty(module.code)) {
            throw graphane_error_1.GraphaneError.module.alreadyRegistered(module.code);
        }
        this.modules.push(module);
        this.codeMap[module.code] = module;
    }
    ;
    static cfg(env, code) {
        if (code === undefined) {
            if (env === null)
                throw (0, fatal_error_1.fatalError)();
            code = env.string("CODE");
        }
        return { module: { code } };
    }
    ;
    constructor(cfg, logger = null, roles = {}) {
        this.roles = roles;
        this.entities = {};
        let config;
        if (typeof cfg === "string") {
            this.code = cfg;
            config = Module.cfg(null, cfg);
        }
        else {
            config = cfg;
        }
        if (!(0, required_properties_1.requiredProperties)(config, "module") || !(0, required_properties_1.requiredProperties)(config.module, "code"))
            throw (0, fatal_error_1.fatalError)(`Module config does not have the required keys`);
        this.code = config["module"]["code"].toUpperCase();
        this.cfg = config;
        this.px = new prefixed_module_1.PrefixedModule(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey);
        }
        this.logger = typeof logger === "function" ? logger(this) : logger;
        Module.addModule(this);
    }
    ;
}
exports.Module = Module;
Module.modules = [];
Module.codeMap = {};
