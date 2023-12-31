import { NextFunction, Request, Response } from "express";
import { Logger } from "../../service-interfaces";
import { CurrentApplication } from "../../application/current-application";
export declare function exceptionHandler(mainLogger: Logger, currentApplication: CurrentApplication): (error: Error, req: Request, res: Response, next: NextFunction) => Promise<void>;
