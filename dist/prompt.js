"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/prefer-default-export */
const inquirer_1 = __importDefault(require("inquirer"));
const savefile_1 = require("./savefile");
const commands_1 = require("./commands");
async function confirmRemove(alias, command) {
    const { remove } = await inquirer_1.default.prompt({
        type: "confirm",
        name: "remove",
        message: `Really remove alias \`${alias}\` (\`${command}\`)? This can not be undone.`
    });
    return remove;
}
async function confirmOverwrite(alias, command, oldCommand) {
    const { overwrite } = await inquirer_1.default.prompt({
        type: "confirm",
        name: "overwrite",
        message: `Alias \`${alias}\` (\`${oldCommand}\`) already exists\nOverwrite with \`${command}\`?`
    });
    return overwrite;
}
async function promptAlias(command) {
    const { alias } = await inquirer_1.default.prompt({
        type: "input",
        name: "alias",
        message: `What alias should \`${command}\` be saved to?`
    });
    return alias;
}
async function promptSave(cwd, command) {
    const alias = await promptAlias(command);
    const oldStruct = commands_1.getCommandsForCwd(cwd);
    const aliasExists = oldStruct && alias in oldStruct;
    if (aliasExists) {
        const oldCommand = oldStruct ? oldStruct[alias] : "";
        const shouldOverwrite = confirmOverwrite(alias, command, oldCommand);
        if (!shouldOverwrite) {
            return false;
        }
    }
    savefile_1.saveCommand(cwd, alias, command);
    return true;
}
exports.promptSave = promptSave;
async function promptRemove(cwd, alias) {
    const oldStruct = commands_1.getCommandsForCwd(cwd);
    if (!oldStruct || !oldStruct[alias]) {
        return false;
    }
    const shouldRemove = oldStruct && await confirmRemove(alias, oldStruct[alias]);
    if (shouldRemove) {
        savefile_1.removeCommand(cwd, alias);
        return true;
    }
    return false;
}
exports.promptRemove = promptRemove;
