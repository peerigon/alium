/* eslint-disable import/prefer-default-export */
import program from "commander";
import { VERSION } from "./constants";



export function bailOnMissingArg(arg: any) {
	const argumentMissing = typeof arg !== "string";
	if (argumentMissing) {
		program.outputHelp();
		process.exit(0);
	}
}

export function parseArgv(argv:Array<string>) {
	if (argv.length <= 2) {
		argv.push("-l");
	}

	let userAlias = "";

	program
		.arguments("<cmd> [env]")
		.version(VERSION, '-v, --version')
		.option("-l, --list", "List aliases")
		.option("-s, --save [alias]", "Save an alias")
		.option("-r, --remove [alias]", "remove alias")
		.action((cmd: string) => {
			userAlias = cmd;
		})
		.parse(argv);

	return {
		save: program.save,
		list: program.list,
		remove: program.remove,
		userAlias
	};
}
