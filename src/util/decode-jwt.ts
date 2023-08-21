import {decode, TAlgorithm} from "jwt-simple";


export default function decodeJWT(token: string | undefined, secret: string, algorithm: TAlgorithm = "HS512") {
    if (typeof token === "undefined") {
        return undefined;
    }
    try {
        return decode(token, secret, false, algorithm);
    } catch (e) {
        return undefined;
    }
}
