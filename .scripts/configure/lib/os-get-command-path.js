const pspawn = require('./os-pspawn');
/**
 * Will try to detect the path to a command.
 *
 * Modify at your own risk.
 *
 * @param {string} command
 */
module.exports = async (command) => {
  if (process.platform !== 'win32') {
    const {stdout, code} = await pspawn(['which', command]);
    if (!stdout || code !== 0) {
      return '';
    }
    return stdout.trim();
  }
  const {stdout, code} = await pspawn([
    ...'powershell -ExecutionPolicy ByPass -Command'.split(' '),
    `(Get-Command ${command}).Source`,
  ]);
  if (!stdout || code !== 0) {
    return '';
  }
  return stdout.trim();
};
