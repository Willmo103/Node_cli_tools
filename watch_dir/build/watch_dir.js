"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander = __importStar(require("commander"));
const fs = __importStar(require("fs"));
const chokidar = __importStar(require("chokidar"));
// initialize commander
const program = new commander.Command();
// configure commander
program.version('0.0.1');
program.arguments('<dir>');
program.option('-l, --log <path>', 'specify log file', false);
program.helpOption('-h, --help', 'display help for command');
program.option('-v, --verbose', 'display verbose output', true);
program.parse(process.argv);
program.showHelpAfterError();
// get directory from command line
const dir = program.args[0];
// get log file from command line
const logFile = program.opts().logFile;
// get verbose from command line
const verbose = program.opts().verbose;
// check if log file exists
if (logFile) {
    if (!fs.existsSync(logFile)) {
        console.error(`Log file '${logFile}' does not exist.`);
        process.exit(1);
    }
}
// check if directory exists
if (!fs.existsSync(dir)) {
    console.error(`Directory '${dir}' does not exist.`);
    process.exit(1);
}
// watch directory
chokidar.watch(dir).on('all', (event, path) => {
    if (logFile) {
        fs.appendFileSync(logFile, `${event}: ${path}\n`);
    }
    if (verbose) {
        console.log(`${event}: ${path}`);
    }
});
