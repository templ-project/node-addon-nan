const path = require('path');

const globby = require('globby');

/**
 * Detect C/CC/CPP files in the src/ folder. And returns them for all the templates that require the C++ file list.
 *
 * Modify at your own risk.
 */
module.exports = async () => {
  const rootFolder = path.join(__dirname, '..', '..', '..');
  const files = await globby(path.join(rootFolder, 'test', '*.(test|spec).(j|t)s'));

  return files
    .map((f) => f.replace(rootFolder, '.').replace(/\\/g, '/'))
    .filter((f) => {
      // If you need to exclude files, change this function.
      return true;
    });
};
