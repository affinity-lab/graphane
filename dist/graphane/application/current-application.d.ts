import { Request } from "express";
import Application from "./application";
export default class CurrentApplication {
    private reader;
    constructor(reader: (req: Request) => Application | undefined);
    get(req: Request): any;
}
