import GraphaneError from "../../error/graphane-error";
import {Context} from "../../server/context";
import {createUploadToken} from "../../server/create-upload-token";
import {AtomWithAttachments} from "../atom";
import Catalog from "./catalog";
import {ImgFocus} from "./file/image-attachment";
import {ChangeFileInput, FileInputVariables} from "./inputs";


export default class FileCrud<Entity extends AtomWithAttachments> {
    constructor(
        private readonly entity: {new(): Entity} & typeof AtomWithAttachments,
        private readonly uploadTokenKey: string
    ) {
    };

    checkVariablesExist(variables: FileInputVariables | undefined): void | never {
        if (typeof variables === "undefined") {
            throw GraphaneError.attachment.fileCrud.badInput("variables");
        }
        if (typeof variables.fileName === "undefined") {
            throw GraphaneError.attachment.fileCrud.badInput("fileName");
        }
    };

    async execute({
                      command,
                      id,
                      catalog
                  }: ChangeFileInput,
                  variables: FileInputVariables,
                  context: Context
    ): Promise<string | void | never> {
        let catalogInstance: Catalog = await this.getCatalog(id, catalog);
        switch (command) {
            case "upload":
                return createUploadToken(this.entity, id, catalog, context.authorizable!, this.uploadTokenKey);
            case "delete":
                this.checkVariablesExist(variables);
                await catalogInstance.removeFiles(variables!.fileName as string);
                return;
            case "rename":
                this.checkVariablesExist(variables);
                if (typeof variables!.newName === "undefined") {
                    throw GraphaneError.attachment.fileCrud.badInput("newName");
                }
                await catalogInstance.renameFile(variables!.fileName as string, variables!.newName);
                return;
            case "reorder":
                this.checkVariablesExist(variables);
                if (typeof variables!.index === "undefined") {
                    throw GraphaneError.attachment.fileCrud.badInput("index");
                }
                await catalogInstance.reorderFiles(variables!.fileName as string, variables!.index);
                return;
            case "giveTitle":
                this.checkVariablesExist(variables);
                if (typeof variables!.title === "undefined") {
                    throw GraphaneError.attachment.fileCrud.badInput("title");
                }
                await catalogInstance.giveTitleToFile(variables!.fileName as string, variables!.title);
                return;
            case "changeImageFocus":
                this.checkVariablesExist(variables);
                if (typeof variables!.imageFocus === "undefined") {
                    throw GraphaneError.attachment.fileCrud.badInput("imageFocus");
                }
                await catalogInstance.changeImageFocus(variables!.fileName as string, variables!.imageFocus as ImgFocus);
                return;
            default:
                throw GraphaneError.attachment.fileCrud.unkonwCommand(command);
        }
    };

    private async getCatalog(id: number, catalogName: string): Promise<Catalog | never> {
        const catalogInstance: Catalog | undefined = (await this.entity.crud.readOneByIdOrFail(id)).getCatalog(catalogName);
        if (typeof catalogInstance === "undefined") {
            throw GraphaneError.attachment.fileCrud.badInput("catalog");
        }
        return catalogInstance;
    };
}
