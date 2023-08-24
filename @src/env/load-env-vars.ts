import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import {parse} from "ini";

export default function loadEnvVars(file: string = ".env") {
	const p = path.parse(file);
	const fileContents = fs.readFileSync(file).toString();
	return p.ext === ".ini"
		   ? parse(fileContents)
		   : dotenv.parse(fileContents);
}