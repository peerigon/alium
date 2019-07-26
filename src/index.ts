#!/usr/bin/env node

import exec from "await-exec";
import { say, error } from "./output";
import listCommands, { getCommandsForCwd } from "./commands";
import { bailOnMissingArg, parseArgv } from "./util";
import { promptSave, promptRemove } from "./prompt";


const cwd = process.cwd();

(async () => {
	const { list, save, remove, userAlias } = parseArgv(process.argv);

	if (list === true) {
		listCommands(cwd);
		return;
	}

	if (save) {
		bailOnMissingArg(save);
		const written = await promptSave(cwd, save);
		if (written) {
			say(`Saved alias \`${save}\``);
		} else {
			error("Could not save alias!");
		}
		return;
	}

	if (remove) {
		bailOnMissingArg(remove);

		const removed = await promptRemove(cwd, remove);

		say(
			removed
				? `Removed alias \`${remove}\``
				: `Alias \`${remove}\` not found`
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
				shell: false
			});
			// eslint-disable-next-line no-console
			console.log(stdout, stderr);
			return;
		}

		error(`Alias \`${userAlias}\` not found.`);
	}
})();
