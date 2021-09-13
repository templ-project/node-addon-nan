const globby = require('globby');
const path = require('path');

/**
 * Detect C/CC/CPP files in the src/ folder. And returns them for all the templates that require the C++ file list.
 *
 * Modify at your own risk.
 */
module.exports = async () => {
  const rootFolder = path.join(__dirname, '..', '..', '..');
  const files = await globby(path.join(rootFolder, 'src', '**', '*.c(c|pp|)'));

  return files
    .map((f) => f.replace(rootFolder, '').substr(1).replace(/\\/g, '/'))
    .sort((a, b) =>
      a.split('/').length > b.split('/').length ? -1 : a.split('/').length < b.split('/').length ? 1 : 0,
    )
    .filter((f) => {
      // If you need to exclude files, change this function.
      return true;
    });
};
