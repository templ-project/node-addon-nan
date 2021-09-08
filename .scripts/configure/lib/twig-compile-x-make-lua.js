const colors = require('colors');
const fs = require('fs');
const path = require('path');

const ewrap = require('./utils-error-wrap');
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
  ewrap(() => {
    const filePath = path.join(__dirname, '..', '..', '..', 'xmake.lua');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(
      filePath,
      twigCompile('xmake.lua', {
        folders: libraryFolders(options),
        platform: process.platform,
        languages: `\"${[...options.cStandard, ...options.cppStandard].join('", "')}\"`,
      }),
    );
  });
};
