/* eslint-disable import/prefer-default-export */
import { homedir } from "os";
import { join } from "path";
import fs from "fs";
import program from "commander";
import { say, error, debug } from "./output";
import { VERSION, COMMAND_FILE_NAME, PEC_AFTER_RUN, PEC_ABORT } from "./constants";

export async function run(command:string) {
	try {
		const filePath = join(homedir(), COMMAND_FILE_NAME);
		debug(`Write "${command}" to ${filePath}`);
		fs.writeFileSync(filePath, command, 'utf8');
		
		say(`Run: \`${command}\``);
		process.exit(PEC_AFTER_RUN);
	} catch(err) {
		error(err);
		process.exit(PEC_ABORT);
	}
}

export function bailOnMissingArg(arg: any) {
	const argumentMissing = typeof arg !== "string";
	if (argumentMissing) {
		program.outputHelp();
		process.exit(PEC_ABORT);
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
