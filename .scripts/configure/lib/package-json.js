const fs = require('fs');
const path = require('path');

/**
 * package.json content
 *
 * Modify at your own risk.
 */
module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'package.json')).toString());

// console.log(module.exports);
