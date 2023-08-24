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
const fs = __importStar(require("fs"));
const Path = __importStar(require("path"));
const rotating_file_stream_1 = require("rotating-file-stream");
const logger_1 = require("../logger");
const writer_1 = __importDefault(require("./writer"));
class RotatingFileWriter extends writer_1.default {
    constructor(level = logger_1.LOGLEVEL.DEBUG, path, archivePath, streamOptions) {
        super(level);
        this.level = level;
        this.path = path;
        this.archivePath = archivePath;
        this.streamOptions = streamOptions;
        this.stream = (0, rotating_file_stream_1.createStream)(this.generator(), this.streamOptions);
    }
    ;
    static createRotatingFileWriterFactory({ basePath, archivePath, streamOptions }) {
        return (level, path) => {
            fs.mkdirSync(Path.dirname(basePath + "/" + path), { recursive: true });
            fs.mkdirSync(Path.dirname(archivePath + "/" + path), { recursive: true });
            return new RotatingFileWriter(level, basePath + "/" + path, archivePath + "/" + path, streamOptions);
        };
    }
    ;
    write(formatted) {
        this.stream.write(formatted + "\n");
    }
    ;
    generator() {
        return (time, index) => {
            if (!(time && index)) {
                return `${this.path}.log`;
            }
            time = time;
            return `${this.archivePath}/${time.getFullYear().toString()}-${(time.getMonth() + 1).toString().padStart(2, "0")}-${(time.getDate()).toString().padStart(2, "0")}-${index}`;
        };
    }
    ;
}
exports.default = RotatingFileWriter;
