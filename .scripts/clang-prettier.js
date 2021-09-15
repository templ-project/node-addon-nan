const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const osGetCommandPath = require('./configure/lib/os-get-command-path');
const osPspawn = require('./configure/lib/os-pspawn');
const globby = require('globby');
const colors = require('colors');

const debug = process.env.DEBUG ? true : false;

async function main() {
  const clangFormat = await osGetCommandPath('clang-format');
  if (!clangFormat) {
    console.error('C++ linting & prettify are dependent on LLVM CLang binaries.'.red);
    console.error(`Could not find 'clang-format'. Please install LLVM Clang from`.red);
    console.error('https://github.com/llvm/llvm-project/releases'.yellow);
    console.error('or run'.gray);
    console.error('$ git clone https://github.com/dragoscirjan/configs --branch v2;'.gray);
    console.error('$ cd config/lang; make clang'.gray);
    process.exit(1);
  }

  const commands = await globby(process.argv[2]).then((files) =>
    files
      .filter((f) => f)
      .map((file) => ({
        file,
        command: [
          clangFormat.trim(),
          ...process.argv.slice(3),
          path.isAbsolute(file) ? file : path.join(__dirname, '..', file),
          '--',
          ...(process.env.CLANG_ARGS ? process.env.CLANG_ARGS.split(' ') : []),
        ],
      })),
  );

  for (const command of commands) {
    if (debug) {
      console.log(command.command.join(' '));
    }
    const prePrettier = fs.readFileSync(command.file).toString();
    const {stdout, stderr, code} = await osPspawn(command.command);
    const postPrettier = fs.readFileSync(command.file).toString();
    if (command.command.includes('-i')) {
      if (code !== 0) {
        console.log(stdout + stderr);
        process.exit(code);
      } else {
        if (prePrettier === postPrettier) {
          console.log(`${command.file}`.gray);
        } else {
          console.log(`${command.file}`);
        }
      }
    } else {
      console.log(`${command.file}`.gray);
      console.log(stdout + stderr);
      if (code !== 0) {
        process.exit(code);
      }
    }
  }
}

main();
