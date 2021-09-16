const packageJson = require('./package-json');

/**
 * Will clear all build system configurations from package.json, resetting all scripts to default.
 *
 * Modify at your own risk.
 */
module.exports = () => {
  delete packageJson.gypfile;
  if (packageJson.scripts && packageJson.scripts.install) {
    packageJson.scripts.install = packageJson.scripts.install.replace(/\s*npm run build:addon\s*/, ' ');
    if (!packageJson.scripts.install.trim().length) {
      delete packageJson.scripts.install;
    }
  }

  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[\s]+/,
    'build:addon:gyp',
  );

  packageJson.scripts['build:dev'] = 'npm run build:addon -- --debug';
  packageJson.scripts['prebuild:dev'] = '';
  delete packageJson.scripts['prebuild:dev'];
};
