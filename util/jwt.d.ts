import jwt from "jsonwebtoken";
export declare class Jwt<T> {
    private readonly secret;
    private readonly expires?;
    private readonly algorithm;
    constructor(secret: string, expires?: string | undefined, algorithm?: jwt.Algorithm);
    decodeJWT(token: string | undefined): T | undefined;
    encodeJWT(payload: T, expires?: string): string;
}
