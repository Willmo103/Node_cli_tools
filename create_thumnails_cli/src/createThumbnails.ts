import * as fs from 'fs';
import sharp from 'sharp';

const extensions: string[] = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp', 'nef'];
var width: number = 200;
var height: number = 200;

// parse the root directory from the command line
const rootDir = process.argv[2];
if (!rootDir) {
    console.log('Please provide a root directory');
    printHelp()
    process.exit(1);
} else if (!fs.existsSync(rootDir)) {
    console.log('Root directory does not exist');
    printHelp()
    process.exit(1);
}

// parse any/all optional arguments from the command line
const optionalArgs = process.argv.slice(2)
if (optionalArgs.includes('--size')) {
    const size = optionalArgs[optionalArgs.indexOf('--size') + 1];
    if (size.split(":").length === 2) {
        if (typeof size.split(":")[0] != "number") {
            console.log('Please provide a valid size');
            printHelp()
            process.exit(1);
        } else if (typeof size.split(":")[1] != "number") {
            console.log('Please provide a valid size');
            printHelp()
            process.exit(1);
        } else {
            width = Number(size.split(":")[0]);
            height = Number(size.split(":")[1]);
        }
    } else {
        console.log('Please provide a valid size');
        printHelp()
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
images.forEach(async image => {
    const imageName: string = image.split('.')[0];
    const imageExt: string = image.split('.')[1];
    const thumbPath = `${thumbDir}/${imageName}_thumb.${imageExt}`;
    if (!fs.existsSync(thumbPath)) {
        try {
            const thumbBuffer: Buffer = await sharp(`${rootDir}/${image}`).resize(width, 200).toBuffer();
            fs.writeFileSync(thumbPath, thumbBuffer);
        } catch (err) {
            console.log('Error creating thumbnail:')
            console.log(err);
        }
    }
});


function printHelp() {
    console.log('Usage: node index.js <rootDir> [--add-ext] [--recursive]');
    console.log('Options:');
    console.log('  --size <width:height>  Specify the size of the thumbnails (Default: 200:200)');
}
