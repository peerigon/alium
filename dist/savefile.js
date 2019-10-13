"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const output_1 = require("./output");
const constants_1 = require("./constants");
const util_1 = require("./util");
const filePath = path_1.join(os_1.homedir(), constants_1.ALIASES_FILE_NAME);
function readSaveFile() {
    if (!fs_1.existsSync(filePath)) {
        return { dirs: {} };
    }
    const json = fs_1.readFileSync(filePath).toString();
    return JSON.parse(json);
}
exports.readSaveFile = readSaveFile;
function saveToFile(file) {
    util_1.ensureDirectoryExistence(filePath);
    const json = JSON.stringify(file, null, 2);
    fs_1.writeFileSync(filePath, json, "utf-8");
}
function saveDirs(dirs) {
    const file = readSaveFile();
    saveToFile(Object.assign(Object.assign({}, file), { dirs }));
}
exports.saveDirs = saveDirs;
function saveCommand(dir, name, command) {
    const file = readSaveFile();
    const { dirs } = file;
    if (Object.keys(dirs).includes(dir)) {
        dirs[dir][name] = command;
    }
    else {
        dirs[dir] = { [name]: command };
    }
    saveDirs(dirs);
}
exports.saveCommand = saveCommand;
function removeCommand(dir, name) {
    const file = readSaveFile();
    const { dirs } = file;
    if (Object.keys(dirs).includes(dir)) {
        delete dirs[dir][name];
        saveDirs(dirs);
    }
    else {
        output_1.error(`Alias ${name} not found`);
    }
}
exports.removeCommand = removeCommand;
