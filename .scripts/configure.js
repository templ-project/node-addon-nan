const {Command} = require('commander');

const {
  supportedBuildSystems,
  supportedCStandards,
  supportedCppStandards,
  supportedIdes,

  bsConfigure,
  vscodeConfigure,
  packageJsonConfigure,
  twigCompileCMakeListsTxt,
} = require('./configure/lib');

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
  )
  .option(
    '-cs, --c-standard <cStandards>',
    `[NOT IMPLEMENTED] C Standard (set the most important as 1st value): ${Object.keys(supportedCStandards)}`,
    (value, previous) => previous.concat([value]),
    [supportedCStandards.c11],
  )
  .option(
    '-cpps, --cpp-standard <cppStandards>',
    `[NOT IMPLEMENTED] C++ Standard (set the most important as 1st value): ${Object.keys(supportedCppStandards)}`,
    (value, previous) => previous.concat([value]),
    [supportedCppStandards.cxx11],
  );

program.parse(process.argv);
const options = program.opts();

// console.log(options);

(async () => {
  bsConfigure(options);
  await vscodeConfigure(options);

  /**
   * Configure CLion
   */
  if (options.ide === supportedIdes.CLION) {
    twigCompileCMakeListsTxt(options);
  }

  packageJsonConfigure();
})();
