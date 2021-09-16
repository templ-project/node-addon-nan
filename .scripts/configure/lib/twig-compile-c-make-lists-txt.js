const colors = require('colors');
const fs = require('fs');
const path = require('path');

const bp = require('./utils-back-path');
const cmakeJsLibLocation = require('./cmake-js-lib-location');
const ewrap = require('./utils-error-wrap');
const globbyCppFiles = require('./utils-globby-cpp-files');
const libraryFolders = require('./utils-library-folders');
const nodeModulesNanFolder = require('./node-modules-nan-folder');
const nodeModulesNapiFolder = require('./node-modules-napi-folder');
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
module.exports = async (options) => {
  await ewrap(async () => {
    const filePath = path.join(__dirname, ...bp(3), 'CMakeLists.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);

    let srcFiles = await globbyCppFiles();
    srcFiles = [
      ...new Set(
        srcFiles
          .map((f) => ['c', 'cc', 'cpp', 'h'].map((e) => `${path.dirname(f)}/*.${e}`))
          .reduce((a, b) => a.concat(b), []),
      ),
    ];

    // re-map all node folder inclues with cmake-js variables
    const folders = libraryFolders(options).map((folder) => {
      return folder
        .replace(cmakeJsLibLocation[process.platform], '${CMAKE_CURRENT_BINARY_DIR}/node/${NODEJS_VERSION}/include')
        .replace(nodeModulesNanFolder, '${CMAKE_HOME_DIRECTORY}/node_modules/nan')
        .replace(nodeModulesNapiFolder, '${CMAKE_HOME_DIRECTORY}/node_modules/node-addon-api')
        .replace(/\\/g, '/');
    });

    fs.writeFileSync(
      filePath,
      twigCompile('CMakeLists.txt', {
        folders,
        srcFiles,
        hasNapi: packageJsonContainsNapi(),
        hasNan: packageJsonContainsNan(),
        cppStandards: options.cppStandard.map((x) => x.replace(/cxx|gnuxx/, '')),
        cStandards: options.cStandard.map((x) => x.replace(/c|gnu/, '')),
      }),
    );
  });
};
