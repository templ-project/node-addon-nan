const {spawn} = require('child_process');

/**
 * Will launch & catch a child process with a specified command.
 *
 * Modify at your own risk.
 *
 * @param {string} command
 * @param {number} timeout
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
module.exports = async (command, timeout = 20000) => {
  if (!Array.isArray(command) || command.length < 1) {
    throw new Error('Invalid command');
  }
  return new Promise((resolve, reject) => {
    const runner = spawn(command[0], command.slice(1));
    let stdout = '';
    let stderr = '';

    const t = setTimeout(() => reject('Running command exceeded timeout'), timeout);

    runner.stdout.on('data', (data) => {
      stdout = `${stdout}${data}`;
    });

    runner.stderr.on('data', (data) => {
      stderr = `${stderr}${data}`;
    });

    runner.on('close', (code) => {
      clearTimeout(t);
      resolve({stdout, stderr, code});
    });
  });
};
