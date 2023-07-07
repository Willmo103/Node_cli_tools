# Directory Zipper

Directory Zipper is a Node.js command-line application to zip a specified directory.

## Installation

1. Ensure that Node.js and npm are installed on your machine.
2. Clone this repository and navigate to the project directory.
3. Run `npm install` to install the required dependencies.

## Usage

To zip a directory, use the following command:

```bash
node ./path/to/zip_dir.js <source> [output]

```

- `<source>`: The directory you want to zip. This argument is required.
- `[output]`: The output zip file. This argument is optional. If not provided, the output file will have the same name as the source directory with a ".zip" extension. The zip file will be created in the current working directory.

The script will check if the source directory and the output file (if specified) exist before proceeding. If the source directory does not exist or the output file already exists, the script will log an error and exit.

## Example

Let's say you have a directory named "my_directory" that you want to zip, and you want to save the zip file as "backup.zip". Run the following command:

```bash

node ./path/to/zip_dir.js my_directory backup.zip

```

This will create a zip file named "backup.zip" containing all files and subdirectories from "my_directory".

## Dependencies

- `commander`: A Node.js command-line interfaces solution.
- `archiver`: A high-level streaming archive utility for Node.js.

## License

This project is open-source and available under the MIT License.

---
