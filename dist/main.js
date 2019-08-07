#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const output_1 = require("./output");
const commands_1 = __importStar(require("./commands"));
const util_1 = require("./util");
const prompt_1 = require("./prompt");
const constants_1 = require("./constants");
exports.default = async () => {
    const { list, pick, save, remove, userAlias } = util_1.parseArgv(process.argv);
    const cwd = process.cwd();
    if (list === true) {
        const commands = commands_1.getCommandsForCwd(cwd);
        if (commands) {
            const aliases = commands_1.listCommandsInCwd(cwd, commands);
            if (aliases) {
                aliases.map(output_1.say);
            }
        }
        process.exit(constants_1.PEC_ABORT);
    }
    if (pick === true) {
        const pickedCommand = await commands_1.default(cwd);
        if (pickedCommand) {
            util_1.run(pickedCommand);
        }
        process.exit(constants_1.PEC_ABORT);
    }
    if (save) {
        util_1.bailOnMissingArg(save);
        const written = await prompt_1.promptSave(cwd, save);
        if (written) {
            output_1.say(`Saved alias \`${save}\``);
        }
        else {
            output_1.error("Could not save alias!");
        }
        process.exit(constants_1.PEC_ABORT);
    }
    if (remove) {
        util_1.bailOnMissingArg(remove);
        const removed = await prompt_1.promptRemove(cwd, remove);
        if (removed) {
            output_1.say(`Removed alias \`${remove}\``);
        }
        else {
            output_1.error(`Alias \`${remove}\` not found`);
        }
        process.exit(constants_1.PEC_ABORT);
    }
    if (userAlias) {
        const commands = commands_1.getCommandsForCwd(cwd);
        const commandExists = commands && userAlias in commands;
        if (commandExists && commands) {
            util_1.run(commands[userAlias]);
        }
        output_1.error(`Alias \`${userAlias}\` not found.`);
    }
    process.exit(constants_1.PEC_ABORT);
};
