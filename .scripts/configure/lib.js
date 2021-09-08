const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const {twig} = require('twig');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json')).toString());

/**
 * Supported IDE list
 */
const supportedIdes = {
  CLION: 'clion',
  VSCODE: 'vscode',
};

/**
 * Supported Build Systems
 */
const supportedBuildSystems = {
  // https://cmake.org/ https://www.npmjs.com/package/cmake-js
  CMAKE: 'cmake',
  // https://gyp.gsrc.io/ https://github.com/nodejs/node-gyp
  GYP: 'gyp',
  // https://xmake.io/
  XMAKE: 'xmake',
};

/**
 * node version
 */
const nodeVersion = process.version.substr(1);

/**
 * From process.platform
 */
const nodeLibLocationGyp = {
  aix: '',
  android: '',
  darwin: '',
  freebsd: '',
  linux: path.join(process.env.HOME || '~', '.cache', 'node-gyp', nodeVersion, 'include', 'node'),
  openbsd: '',
  sunos: '',
  win32: path.join(process.env.TEMP || '', '..', 'node-gyp', 'Cache', nodeVersion, 'include', 'node'),
};

const nodeLibLocationCmake = {
  aix: '',
  android: '',
  darwin: '',
  freebsd: '',
  linux: path.join(process.env.HOME || '~', '.cache', 'node-gyp', nodeVersion, 'include', 'node'),
  openbsd: '',
  sunos: '',
  win32: path.join(
    `${process.env.HOMEDRIVE}${process.env.HOMEPATH}`,
    '.cmake-js',
    `node-${process.arch}`,
    process.version,
    'include',
    'node',
  ),
  // C:\Users\dragosc\.cmake-js\node-x64\v12.20.2\include\node
};

/**
 * Generic libs
 */

const pathIsValid = (item) => {
  try {
    fs.statSync(item);
  } catch (e) {
    return false;
  }
  return true;
};

const haveNanInPackagesJson = () =>
  ['dependencies', 'devDependencies'].map((item) => packageJson[item] && packageJson[item].nan).filter((item) => item)
    .length > 0;

const haveNapiInPackagesJson = () =>
  ['dependencies', 'devDependencies']
    .map((item) => packageJson[item] && packageJson[item]['node-addon-api'])
    .filter((item) => item).length > 0;

const libraryFolders = (options) => {
  let folders = ['', 'openssl']
    .map((item) => [item, path.join(nodeLibLocationGyp[process.platform], item)])
    .reduce((acc, item) => [].concat(acc, item), [])
    .filter(pathIsValid);

  if (options.buildSystem === supportedBuildSystems.CMAKE || options.ide === supportedIdes.CLION) {
    folders = ['', 'openssl']
      .map((item) => [item, path.join(nodeLibLocationCmake[process.platform], item)])
      .reduce((acc, item) => [].concat(acc, item), [])
      .filter(pathIsValid);
  }

  // will be dependent on node-gyp files
  // if (options.buildSystem === supportedBuildSystems.XMAKE) {}

  if (haveNanInPackagesJson()) {
    folders.push(path.join(__dirname, '..', '..', 'node_modules', 'nan'));
  }

  // will be dependent on node-gyp files
  if (options.buildSystem === supportedBuildSystems.XMAKE) {
    folders = folders.map((item) => item.replace(/\\/g, '/'));
  }

  return folders;
};

const twigCompile = (name, twigValues) => {
  const filePath = path.join(__dirname, `${name}.twig`);
  console.log(`Reading ${filePath}`.gray);
  return twig({
    data: fs.readFileSync(filePath).toString(),
  }).render(twigValues);
};

async function getCommandPath(command) {
  if (process.platform !== 'win32') {
    const {stdout, code} = await pspawn(['which', command]);
    if (!stdout || code !== 0) {
      return '';
    }
    return stdout;
  }
  const {stdout, code} = await pspawn([
    ...'powershell -ExecutionPolicy ByPass -Command'.split(' '),
    `(Get-Command ${command}).Source`,
  ]);
  if (!stdout || code !== 0) {
    return '';
  }
  return stdout;
}

/**
 *
 * @param {string} command
 * @param {number} timeout
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
async function pspawn(command, timeout = 20000) {
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
}

const ewrap = (callable) => {
  try {
    callable();
  } catch (e) {
    console.error(`Failed: ${e.message} on ${e.stack}`.red);
    process.exit(1);
  }
};

module.exports = {
  nodeLibLocationCmake,
  nodeLibLocationGyp,
  nodeVersion,
  packageJson,
  supportedBuildSystems,
  supportedIdes,

  ewrap,
  getCommandPath,
  haveNanInPackagesJson,
  haveNapiInPackagesJson,
  libraryFolders,
  pathIsValid,
  pspawn,
  twigCompile,
};
