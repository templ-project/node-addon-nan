const supportedIdes = require('./supported-ides');
const twigCompileCompileFlagsTxt = require('./twig-compile-compile-flags-txt');

const twigCompileVSCodeCCppPropertiesJson = require('./twig-compile-v-s-code-c-cpp-properties-json');
const twigCompileVSCodeLaunchJson = require('./twig-compile-v-s-code-launch-json');
const twigCompileVSCodeSettingsJson = require('./twig-compile-v-s-code-settings-json');

/**
 * Will configure Visual Studio Code files
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = async (options) => {
  if (options.ide !== supportedIdes.VSCODE) {
    return;
  }
  twigCompileVSCodeCCppPropertiesJson(options);
  await twigCompileVSCodeLaunchJson(options);
  twigCompileVSCodeSettingsJson(options);
  if (options.vscodeUseClangd) {
    twigCompileCompileFlagsTxt(options);
  }
};
