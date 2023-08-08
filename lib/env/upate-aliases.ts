import * as fs from "fs";
import * as path from "path";
import * as process from "process";


let root = process.cwd();
let packageJson = JSON.parse(fs.readFileSync(path.resolve(root, "package.json")).toString());
let aliases = packageJson["_moduleAliases"];

let tsconfigJson = JSON.parse(fs.readFileSync(path.resolve(root, "tsconfig.json")).toString());
tsconfigJson.compilerOptions.paths = {};
for (const aliasKey in aliases) {
    console.log(aliasKey + " => " + aliases[aliasKey]);
    tsconfigJson.compilerOptions.paths[aliasKey + "/*"] = [aliases[aliasKey] + "/*"];
}

fs.writeFileSync(path.resolve(root, "tsconfig.json"), JSON.stringify(tsconfigJson, null, "\t"));

console.log("done");
