"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_already_registered_error_1 = __importDefault(require("./errors/module-already-registered-error"));
const prefixed_module_1 = require("./prefixed-module");
class Module {
    constructor(code, logger = null, roles = {}) {
        this.code = code;
        this.roles = roles;
        this.entities = {};
        this.code = this.code.toUpperCase();
        this.px = new prefixed_module_1.PrefixedModule(this.code);
        for (const roleKey in this.roles) {
            this.roles[roleKey] = this.px.prefixer(roleKey);
        }
        this.logger = typeof logger === "function" ? logger(this) : logger;
        Module.addModule(this);
    }
    ;
    static addEntity(code, entity) {
        this.codeMap[code].entities[entity.name] = entity;
    }
    ;
    static get(code) {
        return this.codeMap.hasOwnProperty(code) ? this.codeMap[code] : null;
    }
    ;
    static addModule(module) {
        if (this.codeMap.hasOwnProperty(module.code)) {
            throw new module_already_registered_error_1.default(module.code);
        }
        this.modules.push(module);
        this.codeMap[module.code] = module;
    }
    ;
}
Module.modules = [];
Module.codeMap = {};
exports.default = Module;
