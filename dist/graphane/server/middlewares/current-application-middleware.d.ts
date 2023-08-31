import { NextFunction, Request, Response } from "express";
import { CurrentApplication } from "../../application/current-application";
export declare function currentApplicationMiddleware(currentApplication: CurrentApplication, fail?: boolean): (req: Request, res: Response, next: NextFunction) => Promise<void>;
