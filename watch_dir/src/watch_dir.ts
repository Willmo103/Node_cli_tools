import * as commander from 'commander';
import * as chokidar from 'chokidar';
import * as fsPromises from 'fs/promises';

// initialize commander
const program = new commander.Command();

// configure commander
program.version('0.0.1');
program.arguments('<dir>');
program.option('-l, --log <path>', 'specify log file', false)
program.helpOption('-h, --help', 'display help for command');
program.option('-v, --verbose', 'display verbose output', true);
program.parse(process.argv);
program.showHelpAfterError();

async function main() {
    // get directory from command line
    const dir = program.args[0];

    // get log file from command line
    const logFile = program.opts().log;

    // get verbose from command line
    const verbose = program.opts().verbose;

    // check if directory and log file exist
    try {
        await Promise.all([
            fsPromises.access(dir),
            logFile && fsPromises.access(logFile)
        ]);
    } catch (e: any) {
        console.error(`Error: ${e.message}`);
        process.exit(1);
    }

    // watch directory
    chokidar.watch(dir).on('all', (event, path) => {
        if (logFile) {
            fsPromises.appendFile(logFile, `${event}: ${path}\n`).catch((e) => console.error(`Error writing to log file: ${e.message}`));
        }
        if (verbose) {
            console.log(`${event}: ${path}`);
        }
    });
}

main();
