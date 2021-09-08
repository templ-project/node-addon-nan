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
    '-cs, --c-standard <cStandard>',
    `[NOT IMPLEMENTED] C Standard: ${Object.keys(supportedCStandards)}`,
    supportedCStandards.c11,
  )
  .option(
    '-cpps, --cpp-standard <cppStandard>',
    `[NOT IMPLEMENTED] C++ Standard: ${Object.keys(supportedCppStandards)}`,
    supportedCppStandards.cxx11,
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
