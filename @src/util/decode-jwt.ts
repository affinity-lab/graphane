import jwt from "jsonwebtoken"


export default function decodeJWT(token: string | undefined, secret: string): jwt.Jwt | undefined {
    if (typeof token === "undefined") {
        return undefined;
    }
    return jwt.verify(token, secret, {complete: true});
}
