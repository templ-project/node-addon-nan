const path = require('path');

const nodeVersion = require('./node-version');

/**
 * Calculated paths for node-gyp folder locations
 */
module.exports = {
  aix: '',
  android: '',
  darwin: '',
  freebsd: '',
  linux: path.join(process.env.HOME || '~', '.cache', 'node-gyp', nodeVersion, 'include', 'node'),
  openbsd: '',
  sunos: '',
  // win32: path.join(process.env.TEMP || '', '..', 'node-gyp', 'Cache', nodeVersion, 'include', 'node'),
  // grace to LocalSystem, LocalService and NetworkService users ...
  win32: path.join(process.env.USERPROFILE || '', 'AppData', 'Local', 'node-gyp', 'Cache', nodeVersion, 'include', 'node'),
};
