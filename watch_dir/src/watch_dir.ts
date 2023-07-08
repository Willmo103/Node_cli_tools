import * as commander from 'commander';
import * as fs from 'fs';
import * as chokidar from 'chokidar';

// initialize commander
const program = new commander.Command();

// configure commander
program.version('0.0.1');
program.arguments('<dir>');
program.helpOption('-h, --help', 'display help for command');
program.parse(process.argv);
program.showHelpAfterError();
