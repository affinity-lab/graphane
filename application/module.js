"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("../error/graphane-error"));
const prefixed_module_1 = require("./prefixed-module");
const required_properties_1 = __importDefault(require("../util/required-properties"));
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
        if (typeof cfg === "string") {
            this.code = cfg;
        }
        else {
            if (!(0, required_properties_1.default)(cfg, "module") || !(0, required_properties_1.default)(cfg.module, "code"))
                throw graphane_error_1.default.fatal(`Module config does not have the required keys`);
            this.code = cfg["module"]["code"].toUpperCase();
        }
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
