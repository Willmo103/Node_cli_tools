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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const extensions = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp', 'nef'];
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
const addExtension = optionalArgs.includes('--add-ext');
const recursive = optionalArgs.includes('--recursive');
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
images.forEach(image => {
    const imageName = image.split('.')[0];
    const imageExt = image.split('.')[1];
    const thumbPath = `${thumbDir}/${imageName}_thumb.${imageExt}`;
    if (!fs.existsSync(thumbPath)) {
        const thumbBuffer = createThumbnail(`${rootDir}/${image}`);
        if (thumbBuffer) {
            fs.writeFileSync(thumbPath, thumbBuffer);
        }
    }
});
var createThumbnail = (imagePath) => {
    (0, sharp_1.default)(imagePath).resize(200, 200).toBuffer().then(data => {
        return data ? typeof Buffer : null;
    }).catch(err => {
        console.log('Error creating thumbnail:');
        console.log(err);
    });
    return null;
};
function printHelp() {
    console.log('Usage: node index.js <rootDir> [--add-ext] [--recursive]');
    console.log('Options:');
    console.log('--add-ext: Add the extension to the thumbnail file name');
    console.log('--recursive: Create thumbnails for all images in subdirectories');
}
