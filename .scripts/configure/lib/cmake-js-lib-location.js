const path = require('path');

/**
 * Calculated paths for cmake-js folder locations
 */
module.exports = {
  aix: '',
  android: '',
  darwin: '',
  freebsd: '',
  linux: path.join(process.env.HOME || '~', '.cmake-js', 'node-x64', process.version, 'include', 'node'),
  openbsd: '',
  sunos: '',
  // C:\Users\${user}\.cmake-js\node-x64\v12.20.2\include\node
  win32: path.join(
    process.env.USERPROFILE || '',
    '.cmake-js',
    `node-${process.arch}`,
    process.version,
    'include',
    'node',
  ),
};
