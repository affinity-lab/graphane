import FileDescriptor from "../../../util/file-descriptor";
import * as fs from "fs";
import path from "path";
import Catalog from "../catalog";
import StorageInterface from "./storage";


export default class FileStorage implements StorageInterface {
    constructor(private readonly path: string) {
        fs.mkdirSync(path, {recursive: true});
    };

    async purge(catalog: Catalog): Promise<void | never> {
        await Promise.all(this.ls(catalog).map((item: string): Promise<void> => {
            return new Promise<void>((resolve): void => {
                fs.realpath(item, (err: NodeJS.ErrnoException | null, resolvedPath: string): void => {
                    if (err) {
                        throw err;
                    }
                    fs.unlink(resolvedPath, (err: NodeJS.ErrnoException | null): void => {
                        if (err) {
                            throw err;
                        }
                        resolve();
                    });
                });
            });
        }));
        this.removeStructure(this.getPath(catalog));
    };

    addFile(catalog: Catalog, file: FileDescriptor): void {
        fs.copyFileSync(file.file, this.getPath(catalog) + file.name);
    };

    removeFile(catalog: Catalog, file: FileDescriptor): void {
        fs.unlinkSync(this.getPath(catalog) + file.name);
    };

    ls(catalog: Catalog): string[] {
        return fs.readdirSync(this.getPath(catalog));
    };

    private removeStructure(dir: string): void {
        let parent: string = path.parse(dir).dir;
        let list: string[] = fs.readdirSync(dir);
        if (list.length === 0) {
            fs.rmdirSync(dir);
            this.removeStructure(parent);
        }
    };

    private getPath(catalog: Catalog): string {
        let b36: string = catalog.owner.id.toString(36).padStart(6, "0");
        let path: string = `${this.path}/${catalog.module}/${catalog.entity}/${b36.slice(0, 2)}/${b36.slice(2, 4)}/${b36.slice(4, 6)}/${catalog.name}/`;
        fs.mkdirSync(path, {recursive: true});
        return path;
    };
}
