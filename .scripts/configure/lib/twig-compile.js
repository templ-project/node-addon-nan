const fs = require('fs');
const path = require('path');

const {twig} = require('twig');

/**
 * Detect C/CC/CPP files in the src/ folder. And returns them for all the templates that require the C++ file list.
 *
 * Modify at your own risk.
 *
 * @param {string} name
 * @param {object} twigValues Default {}
 */
module.exports = (name, twigValues = {}, isJson = false) => {
  const filePath = path.join(__dirname, '..', `${name}.twig`);
  console.log(`Reading ${filePath}`.gray);

  const compiled = twig({
    data: fs.readFileSync(filePath).toString(),
  }).render(twigValues);

  return !isJson ? compiled : JSON.stringify(JSON.parse(compiled), null, 2);
};
