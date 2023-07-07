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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const extensions = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp', 'nef'];
var width = 200;
var height = 200;
// parse the root directory from the command line
const rootDir = process.argv[2];
if (!rootDir) {
    console.log('Please provide a root directory');
    printHelp();
    process.exit(1);
}
else if (!fs.existsSync(rootDir)) {
    console.log('Root directory does not exist');
    printHelp();
    process.exit(1);
}
// parse any/all optional arguments from the command line
const optionalArgs = process.argv.slice(2);
if (optionalArgs.includes('--size')) {
    const size = optionalArgs[optionalArgs.indexOf('--size') + 1];
    if (size.split(":").length === 2) {
        if (typeof size.split(":")[0] != "number") {
            console.log('Please provide a valid size');
            printHelp();
            process.exit(1);
        }
        else if (typeof size.split(":")[1] != "number") {
            console.log('Please provide a valid size');
            printHelp();
            process.exit(1);
        }
        else {
            width = Number(size.split(":")[0]);
            height = Number(size.split(":")[1]);
        }
    }
    else {
        console.log('Please provide a valid size');
        printHelp();
        process.exit(1);
    }
}
// create a dir for the thumbnails inside of the root dir
const thumbDir = `${rootDir}/thumbnails`;
if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir);
}
// get all the files in the root dir
var files = fs.readdirSync(rootDir);
// filter out the files that are not images
var images = files.filter(file => {
    const ext = file.split('.')[1];
    return extensions.includes(ext);
});
// create a thumbnail for each image
images.forEach((image) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = image.split('.')[0];
    const imageExt = image.split('.')[1];
    const thumbPath = `${thumbDir}/${imageName}_thumb.${imageExt}`;
    if (!fs.existsSync(thumbPath)) {
        try {
            const thumbBuffer = yield (0, sharp_1.default)(`${rootDir}/${image}`).resize(width, 200).toBuffer();
            fs.writeFileSync(thumbPath, thumbBuffer);
        }
        catch (err) {
            console.log('Error creating thumbnail:');
            console.log(err);
        }
    }
}));
function printHelp() {
    console.log('Usage: node index.js <rootDir> [--add-ext] [--recursive]');
    console.log('Options:');
    console.log('  --size <width:height>  Specify the size of the thumbnails (Default: 200:200)');
}
