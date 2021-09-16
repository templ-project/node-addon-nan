const fs = require('fs');
const path = require('path');

const colors = require('colors');

const ewrap = require('./utils-error-wrap');
const globbyCppFiles = require('./utils-globby-cpp-files');
const libraryFolders = require('./utils-library-folders');
const twigCompile = require('./twig-compile');

/**
 * Will compile binding.gyp file.
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  ewrap(async () => {
    const filePath = path.join(__dirname, '..', '..', '..', 'binding.gyp');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    const srcFiles = await globbyCppFiles();

    fs.writeFileSync(
      filePath,
      twigCompile('binding.gyp', {
        cppStandards: options.cppStandard.map((x) => x.replace('xx', '++')),
        cStandards: options.cStandard,
        folders: libraryFolders(options),
        platform: process.platform,
        srcFiles,
      }),
    );
  });
};
