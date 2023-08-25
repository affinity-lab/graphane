import jwt from "jsonwebtoken";


export class Jwt<T> {
	constructor(
		private readonly secret: string,
		private readonly algorithm: jwt.Algorithm = "HS512",
		private readonly expires?: string
	) {};

	decodeJWT(token: string | undefined): T | undefined {
		if (typeof token === "undefined") {
			return undefined;
		}
		let payload: jwt.JwtPayload | string = jwt.verify(token, this.secret, {algorithms: [this.algorithm]});
		if (typeof payload === "string") return undefined;
		return payload.content;
	}

	encodeJWT(payload: T, expires?: string): string {
		return jwt.sign({content: payload}, this.secret, {algorithm: this.algorithm, expiresIn: expires ?? this.expires});
	}
}
