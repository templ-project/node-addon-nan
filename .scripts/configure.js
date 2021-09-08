const colors = require('colors');
const {Command} = require('commander');
const fs = require('fs');
const globby = require('globby');
const path = require('path');

const {
  packageJson,
  supportedIdes,
  supportedBuildSystems,

  haveNanInPackagesJson,
  haveNapiInPackagesJson,
  libraryFolders,
  twigCompile,
  ewrap,
} = require('./configure/lib');

/**
 * Node-Gyp
 */
const configureBindingGyp = () => {
  ewrap(async () => {
    const filePath = path.join(__dirname, '..', 'binding.gyp');
    console.debug(`Configuring ${filePath} ...`.brightBlue);

    const rootFolder = path.join(__dirname, '..');
    let srcFiles = await globby(path.join(rootFolder, 'src', '*.c(c|pp|)'));
    srcFiles = srcFiles.map((f) => f.replace(rootFolder, '').substr(1).replace(/\\/g, '/'));

    fs.writeFileSync(
      filePath,
      twigCompile('binding.gyp', {
        folders: libraryFolders(options),
        platform: process.platform,
        srcFiles,
      }),
    );
  });
};

/**
 * CMake
 */
const configureCMakeListsTxt = () => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', 'CMakeLists.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(
      filePath,
      twigCompile('CMakeLists.txt', {
        folders: libraryFolders(options),
        hasNapi: haveNapiInPackagesJson(),
        hasNan: haveNanInPackagesJson(),
      }),
    );
  });
};

/**
 * Xmake
 */
const configureXmakeLua = () => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', 'xmake.lua');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(
      filePath,
      twigCompile('xmake.lua', {
        folders: libraryFolders(options),
        platform: process.platform,
      }),
    );
  });
};

/*******************************************************************************
 * Build Systems
 ******************************************************************************/

/**
 * Reset everything to default
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

  packageJson.scripts['build:dev'] = 'npm run build:addon -- --debug';
  packageJson.scripts['prebuild:dev'] = '';
  delete packageJson.scripts['prebuild:dev'];
};

/**
 * Configure for CMake
 */
const configureCompilerCmake = () => {
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.install = 'npm run build:addon ' + (packageJson.scripts.install || '');
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:cmake',
  );
  configureCMakeListsTxt();
};

/**
 * Configure for Node-Gyp
 */
const configureCompilerGyp = () => {
  packageJson.gypfile = true;

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:gyp',
  );
  configureBindingGyp();
};

/**
 * Configure for XMake
 */
const configureCompilerXmake = () => {
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.install = 'npm run build:addon ' + (packageJson.scripts.install || '');

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:addon'] = packageJson.scripts['build:addon'].replace(
    /build:addon:[^\s]+/,
    'build:addon:xmake',
  );

  packageJson.scripts['build:dev'] = 'npm run build:addon';
  packageJson.scripts['prebuild:dev'] = 'xmake f -m debug';
  configureXmakeLua();
};

/*******************************************************************************
 * VSCode Configuration
 ******************************************************************************/

const vscodeConfigureLaunchJson = () => {
  ewrap(async () => {
    const filePath = path.join(__dirname, '..', '.vscode', 'launch.json');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    const rootFolder = path.join(__dirname, '..');
    const testFiles = await globby(path.join(rootFolder, 'test', '*.(test|spec).(j|t)s'));
    fs.writeFileSync(
      filePath,
      twigCompile('launch.json', {
        folders: libraryFolders(options),
        platform: process.platform,
        testFiles: testFiles.map((f) => f.replace(rootFolder, '.')),
      }),
    );
  });
};

const vscodeConfigureCCppPropertiesJson = () => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', '.vscode', 'c_cpp_properties.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    const data = require('./configure/c_cpp_properties.json');
    data.configurations = data.configurations
      .filter((item) => item.configureFilter === process.platform)
      .map((item) => {
        delete item.configureFilter;
        delete item.configureSource;
        item.includePath = libraryFolders(options);
        return item;
      });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
};

const vscodeConfigureCompileFlagsTxt = () => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', 'compile_flags.txt');
    console.debug(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(filePath, twigCompile('compile_flags.txt', {folders: libraryFolders(options)}));
  });
};

/**
 *
 */
const vscodeConfigureSettingsJson = () => {
  ewrap(() => {
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
  });
};

/*******************************************************************************
 * CLion Configuration
 *
 * no custom method yet
 ******************************************************************************/

/**
 * Write package.json
 */
const configurePackageJson = () => {
  ewrap(() => {
    const filePath = path.join(__dirname, '..', 'package.json');
    console.log(`Configuring ${filePath} ...`.brightBlue);
    fs.writeFileSync(path.join(__dirname, '..', 'package.json'), JSON.stringify(packageJson, null, 2));
  });
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
// console.log(options);

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

/**
 * Configure Visual Studio Code
 */
if (options.ide === supportedIdes.VSCODE) {
  vscodeConfigureCCppPropertiesJson();
  vscodeConfigureLaunchJson();
  vscodeConfigureSettingsJson();
  if (options.vscodeUseClangd) {
    vscodeConfigureCompileFlagsTxt();
  }
}

/**
 * Configure CLion
 */
if (options.ide === supportedIdes.CLION) {
  configureCMakeListsTxt();
}

configurePackageJson();
