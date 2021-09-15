const globby = require('globby');
const path = require('path');

/**
 * Detect C/CC/CPP files in the src/ folder. And returns them for all the templates that require the C++ file list.
 *
 * Modify at your own risk.
 */
module.exports = async () => {
  // globby does not like windows paths ???
  const rootFolder = path.join(__dirname, '..', '..', '..').replace(/\\/g, '/');
  const searchPath = path.join(rootFolder, 'src', '**', '*.c(c|pp|)').replace(/\\/g, '/');
  const files = await globby(searchPath);

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
