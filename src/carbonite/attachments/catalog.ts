import * as fs                     from "fs";
import micromatch                  from "micromatch";
import FileDescriptor              from "../../util/file-descriptor";
import {AtomWithAttachments}       from "../atom";
import FileAttachment              from "./file/file-attachment";
import ImageAttachment, {ImgFocus} from "./file/image-attachment";
import StorageInterface            from "./storage/storage";
import GraphaneError               from "../../graphane-error";


export type CatalogOptions = {
	maxFileCount: number;
	maxFileSize: number;
	mimeTypePattern: string | string[];
};

export default class Catalog {
	module: string;

	entity: string;

	private readonly options: CatalogOptions = {
		maxFileCount: Infinity,
		maxFileSize: Infinity,
		mimeTypePattern: this.type.mimeTypePattern
	};

	constructor(
		public readonly name: string,
		private readonly type: typeof FileAttachment,
		public readonly owner: AtomWithAttachments,
		private readonly storage: StorageInterface,
		options?: Partial<CatalogOptions>
	) {
		this.module = (owner.constructor as typeof AtomWithAttachments).module;
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
	};

	async addFiles(filename: string | string[]): Promise<void> {
		if (!Array.isArray(filename)) {
			filename = [filename];
		}
		if (this.owner.attachments[this.name].length + filename.length > this.options.maxFileCount) {
			throw GraphaneError.upload.validation.tooManyAttachments(this.options.maxFileCount);
		}
		await Promise.all(filename.map((value: string) => this.addFile(value)));
		await this.owner.save();
	};

	hasFile(name: string): boolean {
		return this.getFile(name) !== undefined;
	};

	getFile(fileName: string): FileAttachment | undefined {
		return this.owner.attachments[this.name].find((file: FileAttachment): boolean => file.name === fileName);
	};

	async removeFiles(filename: string | string[]): Promise<void> {
		if (!Array.isArray(filename)) {
			filename = [filename];
		}
		filename.forEach((file: string) => this.removeFile(file));
		await this.owner.save();
	};

	/**
	 * Compares the catalog file list, and the file list on the storage
	 */
	checkCatalog(): boolean {
		for (let file of this.storage.ls(this)) {
			if (!this.hasFile(file)) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Rebuilds the catalog from the storage
	 */
	async rebuildCatalog(): Promise<void> {
		this.owner.attachments[this.name] = [];
		let files: string[] = this.storage.ls(this);
		await this.addFiles(files);
	};

	/**
	 * Removes all files
	 */
	async purge(): Promise<void> {
		await this.storage.purge(this);
		this.owner.attachments[this.name] = [];
		await this.owner.save();
	};

	async renameFile(fileName: string, newName: string): Promise<void> {
		if (this.hasFile(newName)) {
			throw GraphaneError.attachment.fileCrud.fileAlreadyExists(newName);
		}
		const file: FileAttachment | undefined = this.getFile(fileName);
		if (typeof file === "undefined") {
			throw GraphaneError.attachment.fileCrud.fileNotExists();
		}
		file.name = newName;
		await this.owner.save();

	};

	async giveTitleToFile(fileName: string, title: string): Promise<void> {
		const file: FileAttachment | undefined = this.getFile(fileName);
		if (typeof file === "undefined") {
			throw GraphaneError.attachment.fileCrud.fileNotExists();
		}
		file.title = title;
		await this.owner.save();
	};

	async reorderFiles(fileName: string, index: number): Promise<void> {
		const file: FileAttachment | undefined = this.getFile(fileName);
		if (typeof file === "undefined") {
			throw GraphaneError.attachment.fileCrud.fileNotExists();
		}
		this.owner.attachments[this.name].splice(this.owner.attachments[this.name].indexOf(file), 1);
		this.owner.attachments[this.name].splice(index, 0, file);
		await this.owner.save();
	};

	async changeImageFocus(fileName: string, focus: ImgFocus): Promise<void> {
		const file: FileAttachment | undefined = this.getFile(fileName);
		if (typeof file === "undefined") {
			throw GraphaneError.attachment.fileCrud.fileNotExists();
		}
		if (!(file instanceof ImageAttachment)) throw GraphaneError.attachment.imageExpected();

		file.focus = focus;
		await this.owner.save();
	};

	private async addFile(filename: string): Promise<void> {
		let descriptor: FileDescriptor = new FileDescriptor(filename);
		if (!await descriptor.exists) {
			throw GraphaneError.attachment.fileCrud.fileNotExists();
		}
		if (!micromatch.isMatch(descriptor.mimeType.toString(), this.options.mimeTypePattern)) {
			throw GraphaneError.upload.validation.mimeTypeMismatch(this.options.mimeTypePattern);

		}
		if (await descriptor.size > this.options.maxFileSize) {
			throw GraphaneError.upload.validation.tooLarge(this.options.maxFileSize);
		}
		let name: string = descriptor.name;
		let counter: number = 1;
		while (this.hasFile(name)) {
			name = `${descriptor.parsedPath.name}.${counter.toString()}${descriptor.parsedPath.ext}`;
			counter++;
		}
		if (name !== descriptor.name) {
			fs.renameSync(descriptor.file, `${descriptor.parsedPath.dir}/${name}`);
			descriptor = new FileDescriptor(`${descriptor.parsedPath.dir}/${name}`);
		}
		this.storage.addFile(this, descriptor);
		this.owner.attachments[this.name].push(await this.type.factory(descriptor, this));
	};

	private removeFile(fileName: string): void {
		if (typeof this.getFile(fileName) === "undefined") {
			throw GraphaneError.attachment.fileCrud.fileNotExists();
		}
		this.storage.removeFile(this, new FileDescriptor(fileName));
		this.owner.attachments[this.name] = this.owner.attachments[this.name].filter((item: FileAttachment): boolean => item.name !== fileName);
	};
}
