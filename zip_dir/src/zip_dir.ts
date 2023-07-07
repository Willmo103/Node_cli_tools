#!/usr/bin/env node

import * as commander from "commander"
import * as archiver from "archiver"
import * as fs from "fs"
import * as fsPromises from "fs/promises"

// create a new commander program
const program = new commander.Command()

// define the command line options
program.version("0.0.1")
program.arguments("<source>")
program.option("-o, --output <output>", "Output file")
program.description("Zip a directory")
program.usage("<source>")

// parse the command line arguments
program.parse(process.argv)

async function main() {
    // get the source and output paths
    var source = program.args[0]
    var output = program.args[1] || source + ".zip"

    // check the arguments
    if (!source || !output) {
        program.help()
        return;
    }

    try {
        // check the source and output paths
        await fsPromises.access(source)
    } catch (e) {
        console.error(`Source directory ${source} does not exist`)
        process.exit(1)
    }

    try {
        await fsPromises.access(output)
        console.error(`Output file ${output} already exists`)
        process.exit(1)
    } catch (e) {
        // output file does not exist, this is the expected behavior so we do nothing here
    }

    // check the output file extension (add .zip if not present)
    if (!output.endsWith(".zip")) {
        output += ".zip"
    }

    console.log(`Zipping ${source} to ${output}`)

    // create a new archive
    const archive = archiver.create("zip", {
        zlib: { level: 9 } // Sets the compression level.
    })

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    archive.on("finish", () => {
        console.log("Done!")
    })

    // pipe archive data to the file
    archive.pipe(fs.createWriteStream(output))

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(source, false)

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize()
}

main()
