const fs = require('fs');
const path = require('path');

const colors = require('colors');
const globby = require('globby');

const ewrap = require('./utils-error-wrap');
const libraryFolders = require('./utils-library-folders');
const globbyTestFiles = require('./utils-globby-test-files');
const osGetCommandPath = require('./os-get-command-path');
const twigCompile = require('./twig-compile');

/**
 * Will configure Visual Studio Code .vscode/launch.json file
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = async (options) => {
  await ewrap(async () => {
    const filePath = path.join(__dirname, '..', '..', '..', '.vscode', 'launch.json');
    console.debug(`Configuring ${filePath} ...`.brightBlue);

    const testFiles = await globbyTestFiles();
    const nodePath = await osGetCommandPath('node');

    fs.writeFileSync(
      filePath,
      twigCompile(
        'launch.json',
        {
          folders: libraryFolders(options),
          nodePath,
          platform: process.platform,
          testFiles: testFiles,
        },
        true,
      ),
    );
  });
};
