import FileDescriptor from "../../../util/file-descriptor";
import Catalog from "../catalog";


export default interface StorageInterface {
	addFile(catalog: Catalog, file: FileDescriptor): void;
	removeFile(catalog: Catalog, file: FileDescriptor): void;
	ls(catalog: Catalog): string[];
	purge(catalog: Catalog): Promise<void>;
}
