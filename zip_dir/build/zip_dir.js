#!/usr/bin/env node
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander = __importStar(require("commander"));
const archiver = __importStar(require("archiver"));
const fs = __importStar(require("fs"));
const fsPromises = __importStar(require("fs/promises"));
// create a new commander program
const program = new commander.Command();
// define the command line options
program.version("0.0.1");
program.arguments("<source>");
program.option("-o, --output <output>", "Output file");
program.description("Zip a directory");
program.usage("<source>");
// parse the command line arguments
program.parse(process.argv);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // get the source and output paths
        var source = program.args[0];
        var output = program.args[1] || source + ".zip";
        // check the arguments
        if (!source || !output) {
            program.help();
            return;
        }
        try {
            // check the source and output paths
            yield fsPromises.access(source);
        }
        catch (e) {
            console.error(`Source directory ${source} does not exist`);
            process.exit(1);
        }
        try {
            yield fsPromises.access(output);
            console.error(`Output file ${output} already exists`);
            process.exit(1);
        }
        catch (e) {
            // output file does not exist, this is the expected behavior so we do nothing here
        }
        // check the output file extension (add .zip if not present)
        if (!output.endsWith(".zip")) {
            output += ".zip";
        }
        console.log(`Zipping ${source} to ${output}`);
        // create a new archive
        const archive = archiver.create("zip", {
            zlib: { level: 9 } // Sets the compression level.
        });
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        archive.on("finish", () => {
            console.log("Done!");
        });
        // pipe archive data to the file
        archive.pipe(fs.createWriteStream(output));
        // append files from a sub-directory, putting its contents at the root of archive
        archive.directory(source, false);
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        archive.finalize();
    });
}
main();
