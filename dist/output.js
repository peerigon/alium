"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
/* eslint-disable no-console */
const chalk_1 = __importDefault(require("chalk"));
function say(str) {
    console.log(`${chalk_1.default.green(`Ⓐ `)} ${chalk_1.default.grey(`${str}`)}`);
}
exports.say = say;
function error(str) {
    console.log(`${chalk_1.default.red(`Ⓐ `)} ${chalk_1.default.grey(`${str}`)}`);
}
exports.error = error;
function debug(str) {
    debug_1.default("alium")(chalk_1.default.red(`⌨️ ${str}`));
}
exports.debug = debug;
