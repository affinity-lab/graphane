import FileDescriptor from "../../../util/file-descriptor";
import Catalog from "../catalog";
import StorageInterface from "./storage";
export default class FileStorage implements StorageInterface {
    private readonly path;
    constructor(path: string);
    purge(catalog: Catalog): Promise<void | never>;
    addFile(catalog: Catalog, file: FileDescriptor): void;
    removeFile(catalog: Catalog, file: FileDescriptor): void;
    ls(catalog: Catalog): string[];
    private removeStructure;
    private getPath;
}
