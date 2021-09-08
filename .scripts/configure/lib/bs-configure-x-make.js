const packageJson = require('./package-json');
const twigCompileXMakeLua = require('./twig-compile-x-make-lua');

/**
 * Will configure package.json to xmake requirements and compile the xmake.lua file.
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.install = 'npm run build:addon ' + (packageJson.scripts.install || '');

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:xmake',
  );

  packageJson.scripts['build:dev'] = 'npm run build:addon';
  packageJson.scripts['prebuild:dev'] = 'xmake f -m debug';
  twigCompileXMakeLua(options);
};
