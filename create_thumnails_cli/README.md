# Image Thumbnail Generator

This script is an Image Thumbnail Generator that creates thumbnails for images in a given directory. It is written in Node.js and utilizes the 'sharp' module for image processing, and 'fs' module for file system operations.

## Getting Started

These instructions will guide you through the process of setting up and running this script on your local machine.

### Prerequisites

- Node.js (<https://nodejs.org/>)
- NPM (<https://www.npmjs.com/get-npm>)
- Sharp module (<https://sharp.pixelplumbing.com/install>)

### Installation

- Install Node.js and NPM following their respective documentation.
- Clone or download the script onto your local machine.
- Navigate to the script's directory in your terminal.
- Install the 'sharp' package by running:

```sh
npm install sharp
```

### Usage

The script takes one required argument and one optional argument.

- Required: `<rootDir>` - The directory containing the images you wish to create thumbnails for. The thumbnails will be saved to a 'thumbnails' directory within this directory.

- Optional: `--size <width:height>` - Allows you to specify the dimensions of the thumbnails. If not specified, the default size is 200x200.

Run the script using the following command:

```sh
node index.js <rootDir> [--size <width:height>]
```

For example:

```sh
node index.js /path/to/images --size 400:300
```

### Notes

- The script supports images with 'jpg', 'png', 'gif', 'jpeg', 'bmp', 'webp', 'nef' file extensions.
- Existing thumbnails are not overwritten. Delete a thumbnail manually if you want to regenerate it.
- Errors during the thumbnail creation process are logged to the console.

## Contributing

Please feel free to submit pull requests or open issues to improve the script.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
