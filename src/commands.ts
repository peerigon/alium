import inquirer from "inquirer";
import { say } from "./output";
import { readSaveFile, Commands } from "./savefile";
import { ABORT_STRING } from "./constants";

export function getCommandsForCwd(cwd: string): Commands | null {
	const { dirs } = readSaveFile();
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (dirs?.[cwd]) {
		return dirs[cwd];
	}
	return null;
}

export function listCommandsInCwd(
	cwd: string,
	commands: Commands
): Array<string> | null {
	const aliasPadEnd = Math.max(
		...[...Object.keys(commands).map((s: string): number => s.length)]
	);

	return Object.keys(commands).map((alias: string) => {
		const aliasCommand = commands[alias];
		const aliasPadded = alias.padEnd(aliasPadEnd);

		return `${aliasPadded}  ‣  ${aliasCommand}`;
	});
}

export default async function(cwd: string): Promise<string | null> {
	const commands = getCommandsForCwd(cwd);
	if (!commands || Object.keys(commands).length < 1) {
		say(`No aliases found for this directory.`);
		return null;
	}

	const choices = listCommandsInCwd(cwd, commands);
	if (!choices) {
		say(`No aliases found for this directory.`);
		return null;
	}

	choices.push(ABORT_STRING);

	const { picked } = await inquirer.prompt({
		type: "list",
		choices,
		name: "picked",
		message: `Possible aliases for ${cwd}`
	});

	if (picked === ABORT_STRING) {
		return null;
	}

	const pickedAlias = Object.keys(commands)[
		choices.findIndex(c => c === picked)
	];
	return commands[pickedAlias];
}
