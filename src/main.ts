#!/usr/bin/env node
import { say, error } from "./output";
import pickCommands, { getCommandsForCwd, listCommandsInCwd } from "./commands";
import { run, bailOnMissingArg, parseArgv } from "./util";
import { promptSave, promptRemove } from "./prompt";
import { PEC_ABORT } from "./constants";

export default async () => {
	const { list, pick, save, remove, userAlias } = parseArgv(process.argv);
	const cwd = process.cwd();

	if (list === true) {
		const commands = getCommandsForCwd(cwd);
		if (commands) {
			const aliases = listCommandsInCwd(cwd, commands);
			if (aliases) {
				aliases.map(say);
			}
		}
		process.exit(PEC_ABORT);
	}

	if (pick === true) {
		const pickedCommand = await pickCommands(cwd);
		if (pickedCommand) {
			run(pickedCommand);
		}
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

		if (removed) {
			say(`Removed alias \`${remove}\``);
		} else {
			error(`Alias \`${remove}\` not found`);
		}
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
};
