import { NextFunction, Request, Response } from "express";
import { CurrentApplication } from "../../application/current-application";
export declare function currentApplicationMiddleware(currentApplication: CurrentApplication): (req: Request, res: Response, next: NextFunction) => Promise<void>;
