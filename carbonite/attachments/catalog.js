"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphane_error_1 = __importDefault(require("@src/error/graphane-error"));
const file_descriptor_1 = __importDefault(require("@src/util/file-descriptor"));
const fs = __importStar(require("fs"));
const micromatch_1 = __importDefault(require("micromatch"));
const image_attachment_1 = __importDefault(require("./file/image-attachment"));
class Catalog {
    constructor(name, type, owner, storage, options) {
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.storage = storage;
        this.options = {
            maxFileCount: Infinity,
            maxFileSize: Infinity,
            mimeTypePattern: this.type.mimeTypePattern
        };
        this.module = owner.constructor.module;
        this.entity = owner.constructor.name;
        if (options) {
            Object.assign(this.options, options);
        }
        if (typeof this.owner.attachments === "undefined" || this.owner.attachments === null) {
            this.owner.attachments = {};
        }
        if (!this.owner.attachments.hasOwnProperty(this.name)) {
            this.owner.attachments[this.name] = [];
        }
    }
    ;
    async addFiles(filename) {
        if (!Array.isArray(filename)) {
            filename = [filename];
        }
        if (this.owner.attachments[this.name].length + filename.length > this.options.maxFileCount) {
            throw graphane_error_1.default.upload.validation.tooManyAttachments(this.options.maxFileCount);
        }
        await Promise.all(filename.map((value) => this.addFile(value)));
        await this.owner.save();
    }
    ;
    hasFile(name) {
        return this.getFile(name) !== undefined;
    }
    ;
    getFile(fileName) {
        return this.owner.attachments[this.name].find((file) => file.name === fileName);
    }
    ;
    async removeFiles(filename) {
        if (!Array.isArray(filename)) {
            filename = [filename];
        }
        filename.forEach((file) => this.removeFile(file));
        await this.owner.save();
    }
    ;
    /**
     * Compares the catalog file list, and the file list on the storage
     */
    checkCatalog() {
        for (let file of this.storage.ls(this)) {
            if (!this.hasFile(file)) {
                return false;
            }
        }
        return true;
    }
    ;
    /**
     * Rebuilds the catalog from the storage
     */
    async rebuildCatalog() {
        this.owner.attachments[this.name] = [];
        let files = this.storage.ls(this);
        await this.addFiles(files);
    }
    ;
    /**
     * Removes all files
     */
    async purge() {
        await this.storage.purge(this);
        this.owner.attachments[this.name] = [];
        await this.owner.save();
    }
    ;
    async renameFile(fileName, newName) {
        if (this.hasFile(newName)) {
            throw graphane_error_1.default.attachment.fileCrud.fileAlreadyExists(newName);
        }
        const file = this.getFile(fileName);
        if (typeof file === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.fileNotExists();
        }
        file.name = newName;
        await this.owner.save();
    }
    ;
    async giveTitleToFile(fileName, title) {
        const file = this.getFile(fileName);
        if (typeof file === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.fileNotExists();
        }
        file.title = title;
        await this.owner.save();
    }
    ;
    async reorderFiles(fileName, index) {
        const file = this.getFile(fileName);
        if (typeof file === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.fileNotExists();
        }
        this.owner.attachments[this.name].splice(this.owner.attachments[this.name].indexOf(file), 1);
        this.owner.attachments[this.name].splice(index, 0, file);
        await this.owner.save();
    }
    ;
    async changeImageFocus(fileName, focus) {
        const file = this.getFile(fileName);
        if (typeof file === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.fileNotExists();
        }
        if (!(file instanceof image_attachment_1.default)) {
            throw graphane_error_1.default.attachment.imageExpected();
        }
        file.focus = focus;
        await this.owner.save();
    }
    ;
    async addFile(filename) {
        let descriptor = new file_descriptor_1.default(filename);
        if (!await descriptor.exists) {
            throw graphane_error_1.default.attachment.fileCrud.fileNotExists();
        }
        if (!micromatch_1.default.isMatch(descriptor.mimeType.toString(), this.options.mimeTypePattern)) {
            throw graphane_error_1.default.upload.validation.mimeTypeMismatch(this.options.mimeTypePattern);
        }
        if (await descriptor.size > this.options.maxFileSize) {
            throw graphane_error_1.default.upload.validation.tooLarge(this.options.maxFileSize);
        }
        let name = descriptor.name;
        let counter = 1;
        while (this.hasFile(name)) {
            name = `${descriptor.parsedPath.name}.${counter.toString()}${descriptor.parsedPath.ext}`;
            counter++;
        }
        if (name !== descriptor.name) {
            fs.renameSync(descriptor.file, `${descriptor.parsedPath.dir}/${name}`);
            descriptor = new file_descriptor_1.default(`${descriptor.parsedPath.dir}/${name}`);
        }
        this.storage.addFile(this, descriptor);
        this.owner.attachments[this.name].push(await this.type.factory(descriptor, this));
    }
    ;
    removeFile(fileName) {
        if (typeof this.getFile(fileName) === "undefined") {
            throw graphane_error_1.default.attachment.fileCrud.fileNotExists();
        }
        this.storage.removeFile(this, new file_descriptor_1.default(fileName));
        this.owner.attachments[this.name] = this.owner.attachments[this.name].filter((item) => item.name !== fileName);
    }
    ;
}
exports.default = Catalog;
