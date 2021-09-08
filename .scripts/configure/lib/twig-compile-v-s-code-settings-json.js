const fs = require('fs');
const path = require('path');

const colors = require('colors');

const ewrap = require('./utils-error-wrap');

/**
 * Will configure Visual Studio Code .vscode/launch.json file
 *
 * Modify at your own risk.
 *
 * @param {object} options
 */
module.exports = (options) => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', '..', '..', '.vscode', 'settings.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    const data = require('../settings.json');

    if (options.vscodeUseClangd) {
      data['C_Cpp.intelliSenseEngine'] = 'Disabled';
      data['[cpp]'] = {
        'editor.defaultFormatter': 'llvm-vs-code-extensions.vscode-clangd',
      };
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
};
