import { NextFunction, Request, Response } from "express";
export declare function resolveImgLocationMiddleware(storagePath: string): (req: Request, res: Response, next: NextFunction) => void;
export declare namespace resolveImgLocationMiddleware {
    var locationParams: string;
    var route: (baseUrl: string) => string;
}
