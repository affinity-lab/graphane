import GraphaneError from "../../error/graphane-error";
import {Context} from "../../server/context";
import {AtomWithAttachments} from "../atom";
import Catalog from "./catalog";
import {ImgFocus} from "./file/image-attachment";
import {ChangeFileInput, FileInputVariables} from "./inputs";
import {Jwt} from "../../util/jwt";
import {UploadTokenPayload} from "../../server/upload-token-payload";


function requiredProperties<T>(obj: T | undefined, ...required: Array<keyof T>): undefined | boolean {
	if (typeof obj === "undefined") return undefined;
	for (const name in obj) if (typeof obj[name] === "undefined") return false;
	return true;
}

export default class FileCrud<Entity extends AtomWithAttachments> {
	constructor(
		private readonly entity: { new(): Entity } & typeof AtomWithAttachments,
		private readonly jwt: Jwt<UploadTokenPayload>
	) {}

	checkVariablesExist(obj: FileInputVariables | undefined, ...required: Array<keyof FileInputVariables>): void | never {
		if (typeof obj === "undefined") throw GraphaneError.attachment.fileCrud.badInput("variables");
		for (const name in obj) if (typeof obj[name as keyof FileInputVariables] === "undefined") throw GraphaneError.attachment.fileCrud.badInput(name);
	}

	async execute({command, id, catalog}: ChangeFileInput, variables: FileInputVariables, context: Context): Promise<string | void | never> {
		let catalogInstance: Catalog = await this.getCatalog(id, catalog);
		switch (command) {
			case "upload":
				return this.jwt.encodeJWT({module: this.entity.module, entity: this.entity.name, id, catalog, user: context.authorizable!.id});
			case "delete":
				this.checkVariablesExist(variables, "fileName");
				await catalogInstance.removeFiles(variables.fileName as string);
				return;
			case "rename":
				this.checkVariablesExist(variables, "fileName", "newName");
				await catalogInstance.renameFile(variables.fileName as string, variables.newName!);
				return;
			case "reorder":
				this.checkVariablesExist(variables, "fileName", "index");
				await catalogInstance.reorderFiles(variables.fileName as string, variables.index!);
				return;
			case "giveTitle":
				this.checkVariablesExist(variables, "fileName", "title");
				await catalogInstance.giveTitleToFile(variables.fileName as string, variables.title!);
				return;
			case "changeImageFocus":
				this.checkVariablesExist(variables, "fileName", "imageFocus");
				await catalogInstance.changeImageFocus(variables.fileName as string, variables.imageFocus as ImgFocus);
				return;
			default:
				throw GraphaneError.attachment.fileCrud.unknownCommand(command);
		}
	}

	private async getCatalog(id: number, catalogName: string): Promise<Catalog | never> {
		const catalogInstance: Catalog | undefined = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
		if (typeof catalogInstance === "undefined") {
			throw GraphaneError.attachment.fileCrud.badInput("catalog");
		}
		return catalogInstance;
	}
}
