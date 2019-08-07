"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/prefer-default-export */
const os_1 = require("os");
const path_1 = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const commander_1 = __importDefault(require("commander"));
const output_1 = require("./output");
const constants_1 = require("./constants");
function ensureDirectoryExistence(fp) {
    const dirname = path_1.default.dirname(fp);
    if (fs_1.default.existsSync(dirname)) {
        return;
    }
    ensureDirectoryExistence(dirname);
    fs_1.default.mkdirSync(dirname);
}
exports.ensureDirectoryExistence = ensureDirectoryExistence;
async function run(command) {
    try {
        const filePath = path_1.join(os_1.homedir(), constants_1.COMMAND_FILE_NAME);
        ensureDirectoryExistence(filePath);
        output_1.debug(`Write "${command}" to ${filePath}`);
        fs_1.default.writeFileSync(filePath, command, "utf8");
        output_1.say(`Run: \`${command}\``);
        process.exit(constants_1.PEC_AFTER_RUN);
    }
    catch (err) {
        output_1.error(err);
        process.exit(constants_1.PEC_ABORT);
    }
}
exports.run = run;
function bailOnMissingArg(arg) {
    const argumentMissing = typeof arg !== "string";
    if (argumentMissing) {
        commander_1.default.outputHelp();
        process.exit(constants_1.PEC_ABORT);
    }
}
exports.bailOnMissingArg = bailOnMissingArg;
function parseArgv(argv) {
    if (argv.length <= 2) {
        argv.push("-p");
    }
    let userAlias = "";
    commander_1.default
        .arguments("<cmd> [env]")
        .version(constants_1.VERSION, "-v, --version")
        .option("-l, --list", "List aliases in this directory")
        .option("-p, --pick", "Pick from aliases for this directory")
        .option("-s, --save [alias]", "Save an alias for this directory")
        .option("-r, --remove [alias]", "remove alias from this directory")
        .action((cmd) => {
        userAlias = cmd;
    })
        .parse(argv);
    return {
        save: commander_1.default.save,
        list: commander_1.default.list,
        pick: commander_1.default.pick,
        remove: commander_1.default.remove,
        userAlias
    };
}
exports.parseArgv = parseArgv;
