const fs = require('fs');
const path = require('path');

const bp = require('./utils-back-path');
const ewrap = require('./utils-error-wrap');
const packageJson = require('./package-json');

/**
 * Will write down changes made to packageJson object
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = () => {
  ewrap(() => {
    const filePath = path.join(__dirname, ...bp(3), 'package.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);

    fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
  });
};
