const fs = require('fs');
const path = require('path');

const globby = require('globby');

const ewrap = require('./utils-error-wrap');
const libraryFolders = require('./utils-library-folders');

/**
 * Will configure Visual Studio Code .vscode/c_cpp_properties.json file
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', '..', '..', '.vscode', 'c_cpp_properties.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    const data = require('../c_cpp_properties.json');

    data.configurations = data.configurations
      .filter((item) => item.configureFilter === process.platform)
      .map((item) => {
        delete item.configureFilter;
        delete item.configureSource;
        item.includePath = libraryFolders(options);
        item.cStandard = options.cStandard[0];
        item.cppStandard = options.cppStandard[0].replace('xx', '++');
        return item;
      });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
};
