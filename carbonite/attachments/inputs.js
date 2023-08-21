"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFileInput = exports.FileInputVariables = void 0;
const sanitize_html_1 = __importDefault(require("../../validate-and-format-input/formatters/sanitize-html"));
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const id_input_1 = require("../id-input");
const image_attachment_1 = require("./file/image-attachment");
let FileInputVariables = exports.FileInputVariables = class FileInputVariables {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    sanitize_html_1.default,
    __metadata("design:type", String)
], FileInputVariables.prototype, "fileName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    sanitize_html_1.default,
    __metadata("design:type", String)
], FileInputVariables.prototype, "newName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], FileInputVariables.prototype, "index", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    sanitize_html_1.default,
    __metadata("design:type", String)
], FileInputVariables.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    sanitize_html_1.default,
    __metadata("design:type", String)
], FileInputVariables.prototype, "imageFocus", void 0);
exports.FileInputVariables = FileInputVariables = __decorate([
    (0, type_graphql_1.InputType)()
], FileInputVariables);
let ChangeFileInput = exports.ChangeFileInput = class ChangeFileInput extends id_input_1.IdInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    sanitize_html_1.default,
    __metadata("design:type", String)
], ChangeFileInput.prototype, "command", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    sanitize_html_1.default,
    __metadata("design:type", String)
], ChangeFileInput.prototype, "catalog", void 0);
exports.ChangeFileInput = ChangeFileInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], ChangeFileInput);
