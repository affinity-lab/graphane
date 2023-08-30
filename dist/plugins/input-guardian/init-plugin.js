"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_guardian_1 = __importDefault(require("./input-guardian"));
const graphane_1 = __importDefault(require("../../graphane/graphane"));
graphane_1.default.addResolverDecorator(input_guardian_1.default);
