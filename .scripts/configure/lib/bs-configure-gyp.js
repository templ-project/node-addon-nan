const packageJson = require('./package-json');
const twigCompileBindingGyp = require('./twig-compile-binding-gyp');

/**
 * Will configure package.json to node-gyp requirements and compile the binding.gyp file.
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  packageJson.gypfile = true;

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:gyp',
  );

  twigCompileBindingGyp(options);
};
