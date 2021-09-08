const packageJson = require('./package-json');

/**
 * Validate whether package.json contains `nan` package
 *
 * Modify at your own risk.
 */
module.exports = () =>
  ['dependencies', 'devDependencies'].map((item) => packageJson[item] && packageJson[item].nan).filter((item) => item)
    .length > 0;

// console.log(module.exports);
