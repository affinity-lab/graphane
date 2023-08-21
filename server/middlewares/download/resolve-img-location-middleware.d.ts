import { NextFunction, Request, Response } from "express";
declare function resolveImgLocationMiddleware(storagePath: string): (req: Request, res: Response, next: NextFunction) => void;
declare namespace resolveImgLocationMiddleware {
    var locationParams: string;
    var route: (baseUrl: string) => string;
}
export default resolveImgLocationMiddleware;
