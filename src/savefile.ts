import { homedir } from "os";
import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { error } from "./output";
import { ALIASES_FILE_NAME } from "./constants";
import { ensureDirectoryExistence } from "./util";

const filePath = join(homedir(), ALIASES_FILE_NAME);

export type Commands = {
	[key: string]: string;
};

export type Dirs = {
	[key: string]: Commands;
};

type SaveFile = {
	dirs: Dirs;
};

export function readSaveFile(): SaveFile {
	if (!existsSync(filePath)) {
		return { dirs: {} };
	}
	const json = readFileSync(filePath).toString();
	return JSON.parse(json);
}

function saveToFile(file: SaveFile) {
	ensureDirectoryExistence(filePath);
	const json = JSON.stringify(file, null, 2);
	writeFileSync(filePath, json, "utf-8");
}

export function saveDirs(dirs: Dirs) {
	const file = readSaveFile();
	saveToFile({ ...file, dirs });
}

export function saveCommand(dir: string, name: string, command: string) {
	const file = readSaveFile();
	const { dirs } = file;

	if (Object.keys(dirs).includes(dir)) {
		dirs[dir][name] = command;
	} else {
		dirs[dir] = { [name]: command };
	}
	saveDirs(dirs);
}

export function removeCommand(dir: string, name: string) {
	const file = readSaveFile();
	const { dirs } = file;

	if (Object.keys(dirs).includes(dir)) {
		delete dirs[dir][name];
		saveDirs(dirs);
	} else {
		error(`Alias ${name} not found`);
	}
}
