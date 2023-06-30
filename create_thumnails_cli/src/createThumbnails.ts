import * as fs from 'fs';
import sharp from 'sharp';
import * as path from 'path';

const extensions: string[] = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp', 'nef'];
const settingsJson = fs.readFileSync('settings.json', 'utf8');

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
const optionalArgs = process.argv.slice(2);
const addExtension: boolean = optionalArgs.includes('--add-ext');
const recursive: boolean = optionalArgs.includes('--recursive');

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
    const imageName: string = image.split('.')[0];
    const imageExt: string = image.split('.')[1];
    const thumbPath = `${thumbDir}/${imageName}_thumb.${imageExt}`;
    if (!fs.existsSync(thumbPath)) {
        const thumbBuffer = createThumbnail(`${rootDir}/${image}`);
        if (thumbBuffer) {
            fs.writeFileSync(thumbPath, thumbBuffer);
        }
    }
});

var createThumbnail = (imagePath: string): Buffer | null => {
    sharp(imagePath).resize(200, 200).toBuffer().then(data => {
        return data ? typeof Buffer : null;
    }).catch(err => {
        console.log('Error creating thumbnail:')
        console.log(err);
    })
    return null;
}

function printHelp() {
    console.log('Usage: node index.js <rootDir> [--add-ext] [--recursive]');
    console.log('Options:');
    console.log('--add-ext: Add the extension to the thumbnail file name');
    console.log('--recursive: Create thumbnails for all images in subdirectories');
}

class Settings {
    settingsPath: string
    settingsJson: string
    settings: any

    constructor() {
        this.settingsPath = path.join(__dirname, 'settings.json')
        if (!fs.existsSync(this.settingsPath)) {
            console.log('No settings.json file found\nWriting default settings.json file');
            try {
                fs.writeFileSync(this.settingsPath, JSON.stringify({ settings: { extensions: ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp', 'nef'] } }));
            } catch (err) {
                console.log('Error writing default settings.json file');
                console.log(err);
                process.exit(1);
            }
        }
        this.settingsJson = fs.readFileSync(this.settingsPath, 'utf8');
        this.settings = JSON.parse(this.settingsJson);
    }

    getExtensions(): string[] {
        return this.settings.extensions;
    }

    addExtension(ext: string): void {
        this.settings.extensions.push(ext);
        this.saveSettings();
    }

    saveSettings(): void {
        try {
            fs.writeFileSync(this.settingsPath, JSON.stringify({ settings: this.settings }));
        } catch (err) {
            console.log('Error saving settings.json file');
            console.log(err);
            process.exit(1);
        }
    }
}
