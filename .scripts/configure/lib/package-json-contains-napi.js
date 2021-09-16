const packageJson = require('./package-json');

/**
 * Validate whether package.json contains `node-addon-api` package
 *
 * Modify at your own risk.
 */
module.exports = () =>
  ['dependencies', 'devDependencies']
    .map((item) => packageJson[item] && packageJson[item]['node-addon-api'])
    .filter((item) => item).length > 0;
