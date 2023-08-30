import { NextFunction, Request, Response } from "express";
import { Logger } from "../../service-interfaces";
export default function exceptionHandler(mainLogger: Logger): (req: Request, res: Response, next: NextFunction) => void;
