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
var ImageAttachment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgFocus = void 0;
const type_graphql_1 = require("type-graphql");
const geometry_1 = require("../../../util/geometry");
const file_attachment_1 = __importDefault(require("./file-attachment"));
const graphane_error_1 = __importDefault(require("../../../graphane-error"));
let ImgDimension = class ImgDimension {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ImgDimension.prototype, "width", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ImgDimension.prototype, "height", void 0);
ImgDimension = __decorate([
    (0, type_graphql_1.ObjectType)()
], ImgDimension);
let ImgRGB = class ImgRGB {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ImgRGB.prototype, "r", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ImgRGB.prototype, "g", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ImgRGB.prototype, "b", void 0);
ImgRGB = __decorate([
    (0, type_graphql_1.ObjectType)()
], ImgRGB);
var ImgFocus;
(function (ImgFocus) {
    ImgFocus["CENTRE"] = "centre";
    ImgFocus["TOP"] = "top";
    ImgFocus["LEFT"] = "left";
    ImgFocus["BOTTOM"] = "bottom";
    ImgFocus["RIGHT"] = "right";
    ImgFocus["ENTROPY"] = "entropy";
    ImgFocus["ATTENTION"] = "attention";
})(ImgFocus = exports.ImgFocus || (exports.ImgFocus = {}));
let ImageAttachment = ImageAttachment_1 = class ImageAttachment extends file_attachment_1.default {
    constructor() {
        super(...arguments);
        this.focus = ImgFocus.ATTENTION;
    }
    static async factory(descriptor, catalog) {
        let image = new ImageAttachment_1();
        await this.setup(image, descriptor, catalog);
        return image;
    }
    ;
    static async setup(image, descriptor, catalog) {
        if (!descriptor.isImage)
            throw graphane_error_1.default.attachment.imageExpected();
        let img = await descriptor.image;
        if (img === null)
            throw graphane_error_1.default.attachment.imageExpected();
        await super.setup(image, descriptor, catalog);
        image.dimensions = new geometry_1.Dimension(img.meta.width || 0, img.meta.height || 0);
        image.dominant = img.stats.dominant;
        image.isAnimated = img.meta.pages ? img.meta.pages > 1 : false;
    }
    ;
};
ImageAttachment.mimeTypePattern = "image/*";
__decorate([
    (0, type_graphql_1.Field)(() => ImgDimension),
    __metadata("design:type", geometry_1.Dimension)
], ImageAttachment.prototype, "dimensions", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ImgRGB),
    __metadata("design:type", Object)
], ImageAttachment.prototype, "dominant", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ImageAttachment.prototype, "isAnimated", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ImageAttachment.prototype, "focus", void 0);
ImageAttachment = ImageAttachment_1 = __decorate([
    (0, type_graphql_1.ObjectType)()
], ImageAttachment);
exports.default = ImageAttachment;
