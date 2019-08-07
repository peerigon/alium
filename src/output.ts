import debugHOC from "debug";

/* eslint-disable no-console */
import chalk from "chalk";

export function say(str: string) {
	console.log(`${chalk.green(`Ⓐ `)} ${chalk.grey(`${str}`)}`);
}

export function error(str: string) {
	console.log(`${chalk.red(`Ⓐ `)} ${chalk.grey(`${str}`)}`);
}

export function debug(str: string) {
	debugHOC("alium")(chalk.red(`⌨️ ${str}`));
}
