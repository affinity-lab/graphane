import * as argon2 from "argon2";
import {fatalError} from "../../error/fatal-error";


export class Password {
	constructor(private readonly pepper: Buffer) {};

	async hash(password: string): Promise<string> {
		try {
			return await argon2.hash(password, {secret: this.pepper});
		} catch (error) {
			throw fatalError("error while hashing password", {error});
		}
	};

	async verify(hashedPassword: string, enteredPassword: string): Promise<boolean> {
		try {
			return await argon2.verify(hashedPassword, enteredPassword, {secret: this.pepper});
		} catch (error) {
			throw fatalError("error while verifying password", {error});
		}
	};
}
