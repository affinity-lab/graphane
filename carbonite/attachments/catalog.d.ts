import { ImgFocus } from "../../carbonite/attachments/file/image-attachment";
import { AtomWithAttachments } from "../atom";
import FileAttachment from "./file/file-attachment";
import StorageInterface from "./storage/storage";
export declare type CatalogOptions = {
    maxFileCount: number;
    maxFileSize: number;
    mimeTypePattern: string | string[];
};
export default class Catalog {
    readonly name: string;
    private readonly type;
    readonly owner: AtomWithAttachments;
    private readonly storage;
    module: string;
    entity: string;
    private readonly options;
    constructor(name: string, type: typeof FileAttachment, owner: AtomWithAttachments, storage: StorageInterface, options?: Partial<CatalogOptions>);
    addFiles(filename: string | string[]): Promise<void>;
    hasFile(name: string): boolean;
    getFile(fileName: string): FileAttachment | undefined;
    removeFiles(filename: string | string[]): Promise<void>;
    /**
     * Compares the catalog file list, and the file list on the storage
     */
    checkCatalog(): boolean;
    /**
     * Rebuilds the catalog from the storage
     */
    rebuildCatalog(): Promise<void>;
    /**
     * Removes all files
     */
    purge(): Promise<void>;
    renameFile(fileName: string, newName: string): Promise<void>;
    giveTitleToFile(fileName: string, title: string): Promise<void>;
    reorderFiles(fileName: string, index: number): Promise<void>;
    changeImageFocus(fileName: string, focus: ImgFocus): Promise<void>;
    private addFile;
    private removeFile;
}
