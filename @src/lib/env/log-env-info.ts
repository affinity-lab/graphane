import console from "console";
import chalk from "chalk";
import {Env} from "./env";


export function logEnvInfo(env: Env): void {
	let envInfo = env.info;
	envInfo.sort((a, b) => (a.key > b.key ? 1 : -1));
	const keyLength: number = Math.max(...envInfo.map((item) => item.key.length));
	envInfo.forEach((info) =>
		console.log(
			chalk.gray(info.type.padEnd(8, " ")) +
			chalk.bold.green(info.key) +
			" " +
			chalk
				.rgb(50, 50, 50)
				.italic(".".repeat(keyLength - info.key.length + 2)) +
			(info.defaultValue === undefined ? chalk.redBright.bold("! ") : "") +
			(info.value === info.defaultValue
			 ? chalk.white(info.value)
			 : chalk.cyanBright(info.value) +
				 (info.defaultValue !== undefined
				  ? chalk.gray(" (" + info.defaultValue + ")")
				  : ""))
		)
	);
}
