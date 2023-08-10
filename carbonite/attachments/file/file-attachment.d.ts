import Catalog from "../catalog";
import FileDescriptor from "../../../util/file-descriptor";
export default class FileAttachment {
    static mimeTypePattern: string | string[];
    size: number;
    name: string;
    mimeType: string;
    title: string;
    location: string;
    version: number;
    static factory(descriptor: FileDescriptor, catalog: Catalog): Promise<FileAttachment>;
    protected static setup(file: FileAttachment, descriptor: FileDescriptor, catalog: Catalog): Promise<void>;
}
