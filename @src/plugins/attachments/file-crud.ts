import {Context} from "../../graphane/server/context";
import {AtomWithAttachments} from "./atom-with-attachments";
import {Catalog} from "./catalog";
import {ImgFocus} from "./file/image-attachment";
import {ChangeFileInput, FileInputVariables} from "./inputs";
import {UploadTokenPayload} from "./upload-token-payload";
import {Jwt} from "./service-interfaces";
import {AttachmentError} from "./attachment-error";
import {CurrentAuthorized} from "../auth/current-authorized";


export class FileCrud<Entity extends AtomWithAttachments> {
	constructor(
		private readonly entity: {
			new(): Entity
		} & typeof AtomWithAttachments,
		private readonly jwt: Jwt<UploadTokenPayload>,
		private readonly currentAuthorized: CurrentAuthorized
	) {};

	private checkVariablesExist(obj: FileInputVariables | undefined, ...required: Array<keyof FileInputVariables>): void | never {
		if (typeof obj === "undefined") throw AttachmentError.fileCrud.badInput("variables");
		for (const name of required) if (typeof obj[name] === "undefined") throw AttachmentError.fileCrud.badInput(name);
	};

	async execute({command, id, catalog}: ChangeFileInput, variables: FileInputVariables, context: Context): Promise<string | void | never> {
		let catalogInstance: Catalog = await this.getCatalog(id, catalog);
		switch (command) {
			case "upload":
				return this.jwt.encode({module: this.entity.module, entity: this.entity.name, id, catalog, user: this.currentAuthorized.get(context.request)!.id});
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
				throw AttachmentError.fileCrud.unknownCommand(command);
		}
	};

	private async getCatalog(id: number, catalogName: string): Promise<Catalog | never> {
		const catalogInstance: Catalog | undefined = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
		if (typeof catalogInstance === "undefined") throw AttachmentError.fileCrud.badInput("catalog");
		return catalogInstance;
	};
}
