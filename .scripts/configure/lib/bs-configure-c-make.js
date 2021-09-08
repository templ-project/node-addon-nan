const packageJson = require('./package-json');
const twigCompileCMakeListsTxt = require('./twig-compile-c-make-lists-txt');

/**
 * Will configure package.json to cmake-js requirements and compile the CMakeLists.txt file.
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.install = 'npm run build:addon ' + (packageJson.scripts.install || '');
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:cmake',
  );

  twigCompileCMakeListsTxt(options);
};
