/* eslint-disable import/prefer-default-export */
import inquirer from "inquirer";
import { saveCommand, removeCommand } from "./savefile";
import { getCommandsForCwd } from "./commands";

async function confirmRemove(alias: string, command: string): Promise<boolean> {
	const { remove } = await inquirer.prompt({
		type: "confirm",
		name: "remove",
		message: `Really remove alias \`${alias}\` (\`${command}\`)? This can not be undone.`
	});
	return remove;
}

async function confirmOverwrite(
	alias: string,
	command: string,
	oldCommand: string
): Promise<boolean> {
	const { overwrite } = await inquirer.prompt({
		type: "confirm",
		name: "overwrite",
		message: `Alias \`${alias}\` (\`${oldCommand}\`) already exists\nOverwrite with \`${command}\`?`
	});
	return overwrite;
}

async function promptAlias(command: string): Promise<string> {
	const { alias } = await inquirer.prompt({
		type: "input",
		name: "alias",
		message: `What alias should \`${command}\` be saved to?`
	});
	return alias;
}

export async function promptSave(
	cwd: string,
	command: string
): Promise<boolean> {
	const alias = await promptAlias(command);

	const oldStruct = getCommandsForCwd(cwd);
	const aliasExists = oldStruct && alias in oldStruct;

	if (aliasExists) {
		const oldCommand = oldStruct ? oldStruct[alias] : "";
		const shouldOverwrite = confirmOverwrite(alias, command, oldCommand);
		if (!shouldOverwrite) {
			return false;
		}
	}
	saveCommand(cwd, alias, command);
	return true;
}

export async function promptRemove(
	cwd: string,
	alias: string
): Promise<boolean> {
	const oldStruct = getCommandsForCwd(cwd);

	if (!oldStruct || !oldStruct[alias]) {
		return false;
	}

	const shouldRemove = oldStruct && await confirmRemove(alias, oldStruct[alias]);
	if(shouldRemove) {
		removeCommand(cwd, alias);
		return true;
	}

	return false;
}
