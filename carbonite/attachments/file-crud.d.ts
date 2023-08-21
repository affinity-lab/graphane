import { Context } from "@src/server/context";
import { AtomWithAttachments } from "../atom";
import { ChangeFileInput, FileInputVariables } from "./inputs";
export default class FileCrud<Entity extends AtomWithAttachments> {
    private readonly entity;
    private readonly uploadTokenKey;
    constructor(entity: {
        new (): Entity;
    } & typeof AtomWithAttachments, uploadTokenKey: string);
    checkVariablesExist(variables: FileInputVariables | undefined): void | never;
    execute({ command, id, catalog }: ChangeFileInput, variables: FileInputVariables, context: Context): Promise<string | void | never>;
    private getCatalog;
}
