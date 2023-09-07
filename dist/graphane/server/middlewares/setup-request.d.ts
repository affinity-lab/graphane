import { NextFunction, Request, Response } from "express";
export declare function setupRequest(): (req: Request, res: Response, next: NextFunction) => void;
