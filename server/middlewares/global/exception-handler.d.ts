import { NextFunction, Request, Response } from "express";
import LoggerInterface from "@src/application/loggerInteface";
export default function exceptionHandler(mainLogger: LoggerInterface): (req: Request, res: Response, next: NextFunction) => void;
