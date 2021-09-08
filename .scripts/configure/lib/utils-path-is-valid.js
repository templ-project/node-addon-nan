const fs = require('fs');

/**
 * Determines if a path string is a real path on disk.
 *
 * Modify at your own risk.
 *
 * @param {string} item
 * @returns
 */
module.exports = (item) => {
  try {
    fs.statSync(item);
  } catch (e) {
    return false;
  }
  return true;
};
