import {FileDescriptor} from "../../../util/file-descriptor";
import {Field, ObjectType} from "type-graphql";
import {Catalog} from "../catalog";


@ObjectType()
export class FileAttachment {
	static mimeTypePattern: string | string[] = "*/*";

	@Field()
	size: number;

	@Field()
	name: string;

	@Field()
	mimeType: string;

	@Field()
	title: string;

	@Field()
	location: string;

	static async factory(descriptor: FileDescriptor, catalog: Catalog): Promise<FileAttachment> {
		let file: FileAttachment = new FileAttachment();
		await this.setup(file, descriptor, catalog);
		return file;
	};

	protected static async setup(file: FileAttachment, descriptor: FileDescriptor, catalog: Catalog): Promise<void> {
		file.mimeType = descriptor.mimeType || "";
		file.size = await descriptor.size || 0;
		file.name = descriptor.name;
		file.title = descriptor.parsedPath.base;
		file.location = catalog.owner.ident + "/" + catalog.name;
	};
}
