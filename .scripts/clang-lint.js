const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = require('colors');
const globby = require('globby');

const osGetCommandPath = require('./configure/lib/os-get-command-path');
const osPspawn = require('./configure/lib/os-pspawn');
const utilsLibraryFolders = require('./configure/lib/utils-library-folders');

const debug = process.env.DEBUG ? true : false;

async function main() {
  let includes = utilsLibraryFolders('gyp').map((include) => `-I${include}`);
  includes = [...new Set(includes)];

  const clangTidy = await osGetCommandPath('clang-tidy');
  if (!clangTidy) {
    console.error('C++ linting & prettify are dependent on LLVM CLang binaries.'.red);
    console.error(`Could not find 'clang-tidy'. Please install LLVM Clang from`.red);
    console.error('https://github.com/llvm/llvm-project/releases'.yellow);
    console.error('or run'.gray);
    console.error('$ git clone https://github.com/dragoscirjan/configs --branch v2;'.gray);
    console.error('$ cd config/lang; make clang'.gray);
    process.exit(1);
  }

  const commands = await globby(process.argv[2]).then((files) =>
    files.map((file) => ({
      file,
      command: [
        clangTidy.trim(),
        ...process.argv.slice(3),
        file,
        '--',
        ...includes,
        ...(process.env.CLANG_ARGS ? process.env.CLANG_ARGS.split(' ') : []),
      ],
    })),
  );

  let lintErrors = 0;
  for (const command of commands) {
    if (debug) {
      console.log(command.command.join(' '));
    }
    const {stdout, stderr, code} = await osPspawn(command.command);
    if (code !== 0) {
      if (stdout.match(/: error:/) || stderr.match(/: error:/)) {
        console.log(`${command.file}`.red);
        lintErrors++;
      } else {
        console.log(`${command.file}`.yellow);
      }
      console.log(stdout + stderr);
    } else {
      console.log(`${command.file}`.gray);
    }
  }

  if (lintErrors > 0) {
    process.exit(lintErrors);
  }
}

main();
