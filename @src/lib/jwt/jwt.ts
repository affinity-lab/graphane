import jwt from "jsonwebtoken";


/** Wrapper class for encoding and decoding JSON Web Tokens. */
export default class Jwt<T> {
	constructor(
		private readonly secret: string,
		private readonly expires?: string,
		private readonly algorithm: jwt.Algorithm = "HS512"
	) {};

	decode(token: string | undefined): T | undefined {
		if (typeof token === "undefined") {
			return undefined;
		}
		let payload: jwt.JwtPayload | string = jwt.verify(token, this.secret, {algorithms: [this.algorithm]});
		if (typeof payload === "string") return undefined;
		return payload.content;
	};

	encode(payload: T, expires?: string): string {
		return jwt.sign({content: payload}, this.secret, {algorithm: this.algorithm, expiresIn: expires ?? this.expires});
	};
}