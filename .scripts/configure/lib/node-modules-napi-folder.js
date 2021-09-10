const path = require('path');

const bp = require('./utils-back-path');

/**
 * node_modules node-addon-api folder
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = path.join(__dirname, ...bp(3), 'node_modules', 'node-addon-api');
