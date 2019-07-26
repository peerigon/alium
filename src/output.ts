/* eslint-disable no-console */
import chalk from "chalk";

export function say(str: string) {
	console.log(chalk.grey(`⌨️  ${str}`));
}

export function error(str: string) {
	console.log(chalk.red(`⌨️  ${str}`));
}