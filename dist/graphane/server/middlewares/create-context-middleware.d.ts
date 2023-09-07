import { NextFunction, Request, Response } from "express";
export declare function createContextMiddleware(): (req: Request, res: Response, next: NextFunction) => void;
