import { NextFunction, Request, Response } from "express";
declare function resolveFileLocationMiddleware(): (req: Request, res: Response, next: NextFunction) => void;
declare namespace resolveFileLocationMiddleware {
    var locationParams: string;
    var route: (baseUrl: string) => string;
}
export default resolveFileLocationMiddleware;
