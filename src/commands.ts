import { say } from "./output";
import { readSaveFile, Commands } from "./savefile";

export function getCommandsForCwd(cwd: string): Commands | null {
	const { dirs } = readSaveFile();
	if (dirs && dirs[cwd]) {
		return dirs[cwd];
	}
	return null;
}

export default function(cwd: string) {
	const commands = getCommandsForCwd(cwd);

	if (!commands || Object.keys(commands).length < 1) {
		say(`No aliases found for this directory.`);
		return;
	}

	const aliasPadEnd = Math.max(
		...[...Object.keys(commands).map((s: string): number => s.length)]
	);

	Object.keys(commands).forEach((alias: string) => {
		const aliasCommand = commands[alias];
		const aliasPadded = alias.padEnd(aliasPadEnd);

		say(`${aliasPadded}  👉   ${aliasCommand}`);
	});
}
