const fs = require('fs');
const path = require('path');

const nodeLibLocationCmake = require('./cmake-js-lib-location');
const nodeLibLocationGyp = require('./node-gyp-lib-lication');
const supportedBuildSystems = require('./supported-build-systems');
const supportedIdes = require('./supported-ides');
const pathIsValid = require('./utils-path-is-valid');
const packageJsonContainsNan = require('./package-json-contains-nan');
const packageJsonContainsNapi = require('./package-json-contains-napi');

/**
 * Will calculate list of libraries that need included in the C++ config files.
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  let folders = ['', 'openssl']
    .map((item) => [item, path.join(nodeLibLocationGyp[process.platform], item)])
    .reduce((acc, item) => [].concat(acc, item), [])
    .filter(pathIsValid);

  if (options.buildSystem === supportedBuildSystems.CMAKE || options.ide === supportedIdes.CLION) {
    folders = ['', 'openssl']
      .map((item) => [item, path.join(nodeLibLocationCmake[process.platform], item)])
      .reduce((acc, item) => [].concat(acc, item), [])
      .filter(pathIsValid);
  }

  // will be dependent on node-gyp files
  // if (options.buildSystem === supportedBuildSystems.XMAKE) {}

  if (packageJsonContainsNan()) {
    folders.push(path.join(__dirname, '..', '..', 'node_modules', 'nan'));
  }

  if (packageJsonContainsNapi()) {
    folders.push(path.join(__dirname, '..', '..', 'node_modules', 'nan'));
  }

  // will be dependent on node-gyp files
  if (options.buildSystem === supportedBuildSystems.XMAKE) {
    folders = folders.map((item) => item.replace(/\\/g, '/'));
  }

  return folders;
};
