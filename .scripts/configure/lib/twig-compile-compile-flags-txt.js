const fs = require('fs');
const path = require('path');

const colors = require('colors');

const ewrap = require('./utils-error-wrap');
const libraryFolders = require('./utils-library-folders');
const twigCompile = require('./twig-compile');

/**
 * Will configure Visual Studio Code .vscode/launch.json file
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', '..', '..', 'compile_flags.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);

    fs.writeFileSync(filePath, twigCompile('compile_flags.txt', {folders: libraryFolders(options)}));
  });
};
