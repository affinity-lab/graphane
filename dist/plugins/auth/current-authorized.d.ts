import { Request } from "express";
import Authorizable from "./authorizable";
export default class CurrentAuthorized {
    private reader;
    constructor(reader: (req: Request) => Authorizable | undefined);
    get(req: Request): any;
}
