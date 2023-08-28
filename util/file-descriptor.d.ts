/// <reference types="node" />
/// <reference types="node" />
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
export type Img = {
    meta: sharp.Metadata;
    stats: sharp.Stats;
};
export default class FileDescriptor {
    readonly file: string;
    constructor(file: string);
    get stat(): Promise<fs.Stats | null>;
    get size(): Promise<number>;
    get exists(): Promise<boolean>;
    get name(): string;
    get parsedPath(): path.ParsedPath;
    get mimeType(): string | false;
    get isImage(): boolean;
    get image(): Promise<Img | null>;
}
