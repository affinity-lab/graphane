"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_guardian_1 = require("./input-guardian");
const graphane_1 = require("../../graphane/graphane");
graphane_1.graphane.addResolverDecoratorBefore(input_guardian_1.InputGuardian);
console.log("Input Guardian plugin initialized.");
