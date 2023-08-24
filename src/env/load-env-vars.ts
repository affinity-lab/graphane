import dotenv from "dotenv";
import * as fs from "fs";

export default function loadEnvVars(file: string = ".env") { return dotenv.parse(fs.readFileSync(file));}