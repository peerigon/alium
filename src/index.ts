#!/usr/bin/env node

import program from "commander";
import exec from "await-exec";
import { say, error } from "./output";
import listCommands, { getCommandsForCwd } from "./commands";

import { promptSave, promptRemove } from "./prompt";

const cwd = process.cwd();
const { argv } = process;

function bailOnMissingArg(arg: any) {
	const argumentMissing = typeof arg !== "string";
	if (argumentMissing) {
		program.outputHelp();
		process.exit(0);
	}
}

(async () => {
	if (argv.length <= 2) {
		argv.push("-l");
	}

	let userAlias = "";

	program
		.arguments("<cmd> [env]")
		.version(process.env.npm_package_version || "0.0.0")
		.option("-l, --list", "List aliases")
		.option("-s, --save [alias]", "Save an alias")
		.option("-r, --remove [alias]", "remove alias")
		.action((cmd: string) => {
			userAlias = cmd;
		})
		.parse(argv);

	if (program.list === true) {
		listCommands(cwd);
		return;
	}

	if (program.save) {
		bailOnMissingArg(program.save);
		const written = await promptSave(cwd, program.save);
		say(written ? "All clear and ready to use!" : "Nothing has changed.");
	}

	if (program.remove) {
		bailOnMissingArg(program.remove);

		const removed = await promptRemove(cwd, program.remove);

		say(
			removed
				? `Removed alias \`${program.remove}\``
				: `Alias \`${program.remove}\` not found`
		);
		return;
	}

	if (userAlias) {
		const commands = getCommandsForCwd(cwd);
		const commandExists = commands && userAlias in commands;

		if (commandExists && commands) {
			say(`Running \`${userAlias}\``);
			const { stdout, stderr } = await exec(commands[userAlias], {
				cwd,
				shell: process.env.SHELL
			});
			// eslint-disable-next-line no-console
			console.log(stdout, stderr);
			return;
		}

		error(`Alias \`${userAlias}\` not found.`);
	}
})();
