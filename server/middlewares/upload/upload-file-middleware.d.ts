import { NextFunction, Request, Response } from "express";
import { Logger } from "../../service-interfaces/service-interfaces";
export default function uploadFileMiddleware(logger: Logger, fileUploadConfig: Record<string, any>): (req: Request, res: Response, next: NextFunction) => void;
