"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const output_1 = require("./output");
const savefile_1 = require("./savefile");
const constants_1 = require("./constants");
function getCommandsForCwd(cwd) {
    const { dirs } = savefile_1.readSaveFile();
    if (dirs && dirs[cwd]) {
        return dirs[cwd];
    }
    return null;
}
exports.getCommandsForCwd = getCommandsForCwd;
function listCommandsInCwd(cwd, commands) {
    const aliasPadEnd = Math.max(...[...Object.keys(commands).map((s) => s.length)]);
    return Object.keys(commands).map((alias) => {
        const aliasCommand = commands[alias];
        const aliasPadded = alias.padEnd(aliasPadEnd);
        return `${aliasPadded}  ‣  ${aliasCommand}`;
    });
}
exports.listCommandsInCwd = listCommandsInCwd;
async function default_1(cwd) {
    const commands = getCommandsForCwd(cwd);
    if (!commands || Object.keys(commands).length < 1) {
        output_1.say(`No aliases found for this directory.`);
        return null;
    }
    const choices = listCommandsInCwd(cwd, commands);
    if (!choices) {
        output_1.say(`No aliases found for this directory.`);
        return null;
    }
    choices.push(constants_1.ABORT_STRING);
    const { picked } = await inquirer_1.default.prompt({
        type: "list",
        choices,
        name: "picked",
        message: `Possible aliases for ${cwd}`
    });
    if (picked === constants_1.ABORT_STRING) {
        return null;
    }
    const pickedAlias = Object.keys(commands)[choices.findIndex(c => c === picked)];
    return commands[pickedAlias];
}
exports.default = default_1;
