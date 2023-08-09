import { TAlgorithm } from "jwt-simple";
export default function decodeJWT(token: string | undefined, secret: string, algorithm?: TAlgorithm): any;
