import { NextFunction, Request, Response } from "express";
import { CurrentAuthorized } from "./current-authorized";
export declare function currentAuthorizedMiddleware(currentAuthorized: CurrentAuthorized): (req: Request, res: Response, next: NextFunction) => Promise<void>;
