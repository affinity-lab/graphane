"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
const prefixed_module_1 = require("./prefixed-module");
const required_properties_1 = __importDefault(require("../util/required-properties"));
const module_config_1 = __importDefault(require("./module-config"));
class Module {
    static get(code) { return this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : null; }
    static addEntity(code, entity) { this.codeMap[code].entities[entity.name] = entity; }
    static addModule(module) {
        if (this.codeMap.hasOwnProperty(module.code)) {
            throw graphane_error_1.default.module.alreadyRegistered(module.code);
        }
        this.modules.push(module);
        this.codeMap[module.code] = module;
    }
    constructor(cfg, logger = null, roles = {}) {
        this.roles = roles;
        this.entities = {};
        let config;
        if (typeof cfg === "string") {
            this.code = cfg;
            config = (0, module_config_1.default)(null, cfg);
        }
        else {
            config = cfg;
        }
        if (!(0, required_properties_1.default)(config, "module") || !(0, required_properties_1.default)(config.module, "code"))
            throw graphane_error_1.default.fatal(`Module config does not have the required keys`);
        this.code = config["module"]["code"].toUpperCase();
        this.cfg = config;
        this.px = new prefixed_module_1.PrefixedModule(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey);
        }
        this.logger = typeof logger === "function" ? logger(this) : logger;
        Module.addModule(this);
    }
}
Module.modules = [];
Module.codeMap = {};
exports.default = Module;
