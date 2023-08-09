import LoggerInterface from "../../../application/loggerInteface";
import { NextFunction, Request, Response } from "express";
export default function uploadFileMiddleware(logger: LoggerInterface, fileUploadConfig: Record<string, any>): (req: Request, res: Response, next: NextFunction) => void;
