const colors = require('colors');
const fs = require('fs');
const path = require('path');

const ewrap = require('./utils-error-wrap');
const libraryFolders = require('./utils-library-folders');
const packageJsonContainsNan = require('./package-json-contains-nan');
const packageJsonContainsNapi = require('./package-json-contains-napi');
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
    const filePath = path.join(__dirname, '..', '..', '..', 'CMakeLists.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(
      filePath,
      twigCompile('CMakeLists.txt', {
        folders: libraryFolders(options),
        hasNapi: packageJsonContainsNapi(),
        hasNan: packageJsonContainsNan(),
      }),
    );
  });
};
