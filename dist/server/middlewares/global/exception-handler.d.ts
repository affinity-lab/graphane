import LoggerInterface from "../../../application/loggerInteface";
import { NextFunction, Request, Response } from "express";
export default function exceptionHandler(mainLogger: LoggerInterface): (req: Request, res: Response, next: NextFunction) => void;
