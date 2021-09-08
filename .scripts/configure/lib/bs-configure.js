const bsConfigureCMake = require('./bs-configure-c-make');
const bsConfigureClear = require('./bs-configure-clear');
const bsConfigureXMake = require('./bs-configure-x-make');
const bsConfigureGyp = require('./bs-configure-gyp');
const supportedBuildSystems = require('./supported-build-systems');

/**
 * Will configure build system.
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  bsConfigureClear();
  switch (options.buildSystem) {
    case supportedBuildSystems.CMAKE:
      bsConfigureCMake(options);
      break;
    case supportedBuildSystems.XMAKE:
      bsConfigureXMake(options);
      break;
    default:
      bsConfigureGyp(options);
  }
};
