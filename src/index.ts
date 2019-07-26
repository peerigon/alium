#!/usr/bin/env node
import { say, error } from "./output";
import listCommands, { getCommandsForCwd } from "./commands";
import { run, bailOnMissingArg, parseArgv } from "./util";
import { promptSave, promptRemove } from "./prompt";
import { PEC_ABORT } from "./constants";


(async () => {
	const { list, save, remove, userAlias } = parseArgv(process.argv);
	const cwd = process.cwd();

	if (list === true) {
		listCommands(cwd);
		process.exit(PEC_ABORT);
	}

	if (save) {
		bailOnMissingArg(save);
		const written = await promptSave(cwd, save);
		if (written) {
			say(`Saved alias \`${save}\``);
		} else {
			error("Could not save alias!");
		}
		process.exit(PEC_ABORT);
	}

	if (remove) {
		bailOnMissingArg(remove);

		const removed = await promptRemove(cwd, remove);

		say(
			removed
				? `Removed alias \`${remove}\``
				: `Alias \`${remove}\` not found`
		);
		process.exit(PEC_ABORT);
	}

	if (userAlias) {
		const commands = getCommandsForCwd(cwd);
		const commandExists = commands && userAlias in commands;

		if (commandExists && commands) {
			run(commands[userAlias]);
		}

		error(`Alias \`${userAlias}\` not found.`);
	}

	process.exit(PEC_ABORT);
})();

