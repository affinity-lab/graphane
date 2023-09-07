import { Context } from "../../graphane/server/context";
import { AtomWithAttachments } from "./atom-with-attachments";
import { ChangeFileInput, FileInputVariables } from "./inputs";
import { UploadTokenPayload } from "./upload-token-payload";
import { Jwt } from "./service-interfaces";
import { CurrentAuthorized } from "../auth/current-authorized";
export declare class FileCrud<Entity extends AtomWithAttachments> {
    private readonly entity;
    private readonly jwt;
    private readonly currentAuthorized;
    constructor(entity: {
        new (): Entity;
    } & typeof AtomWithAttachments, jwt: Jwt<UploadTokenPayload>, currentAuthorized: CurrentAuthorized);
    private checkVariablesExist;
    execute({ command, id, catalog }: ChangeFileInput, variables: FileInputVariables, context: Context): Promise<string | void | never>;
    private getCatalog;
}
