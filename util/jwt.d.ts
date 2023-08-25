import jwt from "jsonwebtoken";
export declare class Jwt<T> {
    private readonly secret;
    private readonly algorithm;
    private readonly expires?;
    constructor(secret: string, algorithm?: jwt.Algorithm, expires?: string | undefined);
    decodeJWT(token: string | undefined): T | undefined;
    encodeJWT(payload: T, expires?: string): string;
}
