import { NextFunction, Request, Response } from "express";
export default function getAppMiddleware(guarded?: boolean, acceptCode?: boolean): (req: Request, res: Response, next: NextFunction) => void;
