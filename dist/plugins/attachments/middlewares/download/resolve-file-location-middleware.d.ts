import { NextFunction, Request, Response } from "express";
export declare function resolveFileLocationMiddleware(): (req: Request, res: Response, next: NextFunction) => void;
export declare namespace resolveFileLocationMiddleware {
    var locationParams: string;
    var route: (baseUrl: string) => string;
}
