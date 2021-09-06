const {Command} = require('commander');
const {twig} = require('twig');
const fs = require('fs');
const path = require('path');

console.log(process.env.NODE_HEADERS);

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());

/**
 * Colors for console.log
 */
const colors = require('colors');

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

const libraryFolders = () => {
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
    folders.push(path.join(__dirname, '..', 'node_modules', 'nan'));
  }

  // will be dependent on node-gyp files
  if (options.buildSystem === supportedBuildSystems.XMAKE) {
    folders = folders.map((item) => item.replace(/\\/g, '/'));
  }

  return folders;
};

const twigCompile = (name, twigValues) => {
  const filePath = path.join(__dirname, 'configure', `${name}.twig`);
  console.log(`Reading ${filePath}`.gray);
  return twig({
    data: fs.readFileSync(filePath).toString(),
  }).render(twigValues);
};

/**
 * CMake
 */
const configureCMakeListsTxt = () => {
  try {
    const filePath = path.join(__dirname, '..', 'CMakeLists.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(
      filePath,
      twigCompile('CMakeLists.txt', {
        folders: libraryFolders(),
        hasNapi: haveNapiInPackagesJson(),
        hasNan: haveNanInPackagesJson(),
      }),
    );
  } catch (e) {
    console.error(`Failed: ${e}`.red);
    process.exit(1);
  }
};

/**
 * Xmake
 */
const configureXmakeLua = () => {
  try {
    const filePath = path.join(__dirname, '..', 'xmake.lua');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(
      filePath,
      twigCompile('xmake.lua', {
        folders: libraryFolders(),
      }),
    );
  } catch (e) {
    console.error(`Failed: ${e}`.red);
    process.exit(1);
  }
};

/**
 * Compilers
 */
const configureCompilerClear = () => {
  delete packageJson.gypfile;
  if (packageJson.scripts && packageJson.scripts.install) {
    packageJson.scripts.install = packageJson.scripts.install.replace(/\s*npm run build:addon\s*/, ' ');
    if (!packageJson.scripts.install.trim().length) {
      delete packageJson.scripts.install;
    }
  }

  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[\s]+/,
    'build:addon:gyp',
  );
};

const configureCompilerCmake = () => {
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.install = 'npm run build:addon ' + (packageJson.scripts.install || '');
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:cmake',
  );
  configureCMakeListsTxt();
};

const configureCompilerGyp = () => {
  packageJson.gypfile = true;

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:gyp',
  );
};

const configureCompilerXmake = () => {
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.install = 'npm run build:addon ' + (packageJson.scripts.install || '');

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:xmake',
  );
  configureXmakeLua();
};

/**
 * VSCode Configuration
 */
const vscodeConfigureCCppPropertiesJson = () => {
  try {
    const filePath = path.join(__dirname, '..', '.vscode', 'c_cpp_properties.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    const data = require('./configure/c_cpp_properties.json');
    data.configurations = data.configurations
      .filter((item) => item.configureFilter === process.platform)
      .map((item) => {
        delete item.configureFilter;
        delete item.configureSource;
        item.includePath = libraryFolders();
        return item;
      });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(`Failed: ${e}`.red);
    process.exit(1);
  }
};

const vscodeConfigureCompileFlagsTxt = () => {
  try {
    const filePath = path.join(__dirname, '..', 'compile_flags.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(filePath, twigCompile('compile_flags.txt', {folders: libraryFolders()}));
  } catch (e) {
    console.error(`Failed: ${e}`.red);
    process.exit(1);
  }
};

const vscodeConfigureSettingsJson = () => {
  try {
    const filePath = path.join(__dirname, '..', '.vscode', 'settings.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    const data = require('./configure/settings.json');
    if (options.vscodeUseClangd) {
      data['C_Cpp.intelliSenseEngine'] = 'Disabled';
      data['[cpp]'] = {
        'editor.defaultFormatter': 'llvm-vs-code-extensions.vscode-clangd',
      };
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(`Failed: ${e}`.red);
    process.exit(1);
  }
};

/**
 * CLion Configuration
 */

// custom method yet

/**
 * package.json
 */
const configurePackageJson = () => {
  try {
    const filePath = path.join(__dirname, '..', 'package.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(path.join(__dirname, '..', 'package.json'), JSON.stringify(packageJson, null, 2));
  } catch (e) {
    console.error(`Failed: ${e}`.red);
    process.exit(1);
  }
};

/**
 * Run Script
 */
const program = new Command();
program
  .version('0.0.1')
  .option(
    '-x, --build-system <buildSystem>',
    `configure a build system: ${Object.values(supportedBuildSystems).join(', ')}`,
    supportedBuildSystems.GYP,
  )
  .option('-e, --ide <ide>', `configure an IDE: ${Object.values(supportedIdes).join(', ')}`, supportedIdes.VSCODE)
  .option(
    '-ucl, --vscode-use-clangd',
    'configure VSCode to use CLang plugin instead of the default Microsoft Intellisense',
  );
program.parse(process.argv);

const options = program.opts();
console.log(options);

/**
 * Configure default compiler
 */

configureCompilerClear();
switch (options.buildSystem) {
  case supportedBuildSystems.CMAKE:
    configureCompilerCmake();
    break;
  case supportedBuildSystems.XMAKE:
    configureCompilerXmake();
    break;
  default:
    configureCompilerGyp();
}

if (options.ide === supportedIdes.VSCODE) {
  vscodeConfigureCCppPropertiesJson();
  vscodeConfigureSettingsJson();
  if (options.vscodeUseClangd) {
    vscodeConfigureCompileFlagsTxt();
  }
}

if (options.ide === supportedIdes.CLION) {
  configureCMakeListsTxt();
}

configurePackageJson();
