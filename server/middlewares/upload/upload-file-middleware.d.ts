import { NextFunction, Request, Response } from "express";
import LoggerInterface from "../../../application/loggerInteface";
export default function uploadFileMiddleware(logger: LoggerInterface, fileUploadConfig: Record<string, any>): (req: Request, res: Response, next: NextFunction) => void;
