import { Context } from "../../server/context";
import { AtomWithAttachments } from "../atom";
import { ChangeFileInput, FileInputVariables } from "./inputs";
import { Jwt } from "../../util/jwt";
import { UploadTokenPayload } from "../../server/upload-token-payload";
export default class FileCrud<Entity extends AtomWithAttachments> {
    private readonly entity;
    private readonly jwt;
    constructor(entity: {
        new (): Entity;
    } & typeof AtomWithAttachments, jwt: Jwt<UploadTokenPayload>);
    private checkVariablesExist;
    execute({ command, id, catalog }: ChangeFileInput, variables: FileInputVariables, context: Context): Promise<string | void | never>;
    private getCatalog;
}
