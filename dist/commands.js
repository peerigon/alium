"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_1 = require("./output");
const savefile_1 = require("./savefile");
function getCommandsForCwd(cwd) {
    const { dirs } = savefile_1.readSaveFile();
    if (dirs && dirs[cwd]) {
        return dirs[cwd];
    }
    return null;
}
exports.getCommandsForCwd = getCommandsForCwd;
function default_1(cwd) {
    const commands = getCommandsForCwd(cwd);
    if (!commands || Object.keys(commands).length < 1) {
        output_1.say(`No aliases found for this directory.`);
        return;
    }
    const aliasPadEnd = Math.max(...[...Object.keys(commands).map((s) => s.length)]);
    Object.keys(commands).forEach((alias) => {
        const aliasCommand = commands[alias];
        const aliasPadded = alias.padEnd(aliasPadEnd);
        output_1.say(`${aliasPadded}  ‣  ${aliasCommand}`);
    });
}
exports.default = default_1;
