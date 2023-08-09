"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtomWithAttachments = exports.Atom = void 0;
var atom_1 = require("./src/carbonite/atom");
Object.defineProperty(exports, "Atom", { enumerable: true, get: function () { return __importDefault(atom_1).default; } });
var atom_2 = require("./src/carbonite/atom");
Object.defineProperty(exports, "AtomWithAttachments", { enumerable: true, get: function () { return atom_2.AtomWithAttachments; } });
