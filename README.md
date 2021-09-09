# Templ Node.js Addon Nan

<!-- https://hits.seeyoufarm.com/ -->
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftempl-project%2Fnode&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/templ-project/nodejs-addon-nan/issues)

![JSCPD](.jscpd/jscpd-badge.svg?raw=true)

<!-- [![TravisCI](https://travis-ci.org/templ-project/nodejs-addon-nan.svg?branch=master)](https://travis-ci.org/templ-project/nodejs-addon-nan) -->
<!-- CI Badges -->
<!-- [![CircleCI](https://circleci.com/gh/templ-project/nodejs-addon-nan.svg?style=shield)](https://circleci.com/gh/templ-project/nodejs-addon-nan) -->

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=alert_status)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=code_smells)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=security_rating)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=ncloc)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=templ-project_nodejs-addon-nan)
[![SonarCloud Bugs](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=bugs)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?id=templ-project_nodejs-addon-nan)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=sqale_index)](https://sonarcloud.io/dashboard?id=templ-project_nodejs-addon-nan)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=templ-project_nodejs-addon-nan&metric=vulnerabilities)](https://sonarcloud.io/component_measures/metric/security_rating/list?id=templ-project_nodejs-addon-nan)

<!-- Donation Badges -->
[![Donate to this project using Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://patreon.com/dragoscirjan)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QBP6DEBJDEMV2&source=url)
<!--
[![Donate to this project using Flattr](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/balupton)
[![Donate to this project using Liberapay](https://img.shields.io/badge/liberapay-donate-yellow.svg)](https://liberapay.com/dragoscirjan)
[![Donate to this project using Thanks App](https://img.shields.io/badge/thanksapp-donate-yellow.svg)](https://givethanks.app/donate/npm/badges)
[![Donate to this project using Boost Lab](https://img.shields.io/badge/boostlab-donate-yellow.svg)](https://boost-lab.app/dragoscirjan/badges)
[![Donate to this project using Buy Me A Coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)](https://buymeacoffee.com/balupton)
[![Donate to this project using Open Collective](https://img.shields.io/badge/open%20collective-donate-yellow.svg)](https://opencollective.com/dragoscirjan)
[![Donate to this project using Cryptocurrency](https://img.shields.io/badge/crypto-donate-yellow.svg)](https://dragoscirjan.me/crypto)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://dragoscirjan.me/paypal)
[![Buy an item on our wishlist for us](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://dragoscirjan.me/wishlist)
-->

<img alt="JavaScript Logo" src="https://github.com/templ-project/nodejs-addon-nanjs-addon-nan/blob/master/javascript.svg?raw=true" width="20%" align="right" />

<!-- Project Description Starts Here -->


> *Any fool can write code that a computer can understand. Good programmers write code that humans can understand.* – Martin Fowler

> **nodejs-addon-nan** is a template project, designed by [Templ Project](http://templ-project.github.io). Please download it and adapt it as you see fit.
>
> **nodejs-addon-nan** includes instructions for initializing a new
> **NodeJs Nan** addon project, and configuring it for development, unit
> testing as well as code linting and analysis.

<!-- TOC -->

- [Templ Node.js Addon Nan](#templ-nodejs-addon-nan)
  - [Getting Started](#getting-started)
    - [Project Description](#project-description)
      - [Linters, Code Analysis, Formatters](#linters-code-analysis-formatters)
        - [Javascript](#javascript)
        - [C++](#c)
        - [Generic](#generic)
      - [Git Hooks](#git-hooks)
        - [pre-commit](#pre-commit)
        - [commit-msg](#commit-msg)
    - [Prerequisites / Dependencies](#prerequisites--dependencies)
        - [For Linux](#for-linux)
        - [For MacOS](#for-macos)
        - [For Windows](#for-windows)
      - [Known Issues / Troubleshooting](#known-issues--troubleshooting)
    - [Installation](#installation)
    - [Development](#development)
      - [Requirements](#requirements)
        - [VSCode Configuration](#vscode-configuration)
        - [CLion Configuration](#clion-configuration)
    - [Testing](#testing)
      - [Single Tests](#single-tests)
    - [Deployment](#deployment)
  - [Authors](#authors)
  - [Issues / Support](#issues--support)
  - [License](#license)

<!-- /TOC -->

## Getting Started

### Project Description

The template is trying to cover multiple build systems, with **[node-gyp](https://github.com/nodejs/node-gyp)** as the default one and it is always offering configuration support for two popular IDEs: Visual Studio Code and CLion.

Project configuration is done using `.scripts/configure.js` script (as it is described bellow), and the files/templates from the `.scripts/configure` folder.

When a build system configuration file is generated, please do not manually alter that file, but alter it's template from `.scripts/configure` and then run the configuration command as described bellow.

#### Linters, Code Analysis, Formatters

##### Javascript
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) for code analisys, will check dependencies & how they're imported
- [prettier](https://prettier.io/) for code formatting
- [eslint](https://eslint.org/) for linting

##### C++

- [clang-format](https://clang.llvm.org/docs/ClangFormat.html) for code formatting
- [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) for linting

##### Generic

- [jscpd](https://github.com/kucherenko/jscpd) for code analisys as copy paste detector
- [dependency-checker](https://github.com/jeremylong/DependencyCheck) (designed by [OWASP](https://owasp.org/www-project-dependency-check/)) for code analisys, will check dependencies & security

> **dependency-checked** is not used by default. The option exists, however using it, especially in pre-commit hooks takes a lot of time. We recommend using this analysis tool as part of CI pipelines.
#### Git Hooks

Git hooks are configured using [husky](https://github.com/typicode/husky)


##### pre-commit

Found in `.husky/pre-commit`, script will run `ca` and `test` scripts from `package.json`. Please take a look in the `package.json` file and follow the two mentioned scripts to understand what they do and how they are called.

##### commit-msg

Found in `.husky/commit-msg`, script will run a [commitlint](https://commitlint.js.org) check. Please read more on the official page on how to customize *commitlint* config.

### Prerequisites / Dependencies

##### For Linux

- Please install `git`, `gcc/g++`, `make`
- Please install `clang-formatter` && `clang-tidy`
- Please also install Python 3.6 or above.
- Depending on the build system, please install: 
  - **NodeGyp**: All requirements are set as default in the above list.
  - **CMake**: `make`, `cmake`
  - **XMake**: `make`, `xmake`

> Do not forget NodeGyp is the main build system, so you need its requirements installed whatsoever.

```bash
# i.e ubuntu
PY_SUBVER=6 sudo apt-get install build-essential git make python3.$PY_SUBVER -y
# for CMake
sudo apt-get install cmake
# for XMake (see https://xmake.io/#/guide/installation)
bash <(curl -fsSL https://xmake.io/shget.text)
```

##### For MacOS

> Help required. Project is not yet configured for MacOS.

##### For Windows

- Please install [git-scm](https://git-scm.com/download/win) tool.
- Please install [Microsoft Build Tools 2017](https://visualstudio.microsoft.com/) or, at least [Microsoft Visual Studio Community 2019 ](https://visualstudio.microsoft.com/vs/)
  - Or, run `npm i -g windows-build-tools` (will silent install Microsoft Build Tools 2017)
- Please install [Python 3.6 or above](https://www.python.org/downloads/windows/)
- Please install [clang+llvm](https://github.com/llvm/llvm-project/releases/tag/llvmorg-12.0.1)
<!-- - Please install `make`
  - [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm)
  - [make](https://sourceforge.net/projects/ezwinports/files/) from [ezwinports](https://sourceforge.net/projects/ezwinports/files/)
  - From [chocolatey](https://chocolatey.org/), run `choco install make` -->
- Depending on the build system, please install: 
  - **NodeGyp**: All requirements are set as default in the above list.
  - **CMake**:
    - [cmake](https://cmake.org/download/)
  - **XMake**:
    - [xmake](https://xmake.io/#/guide/installation)
> Do not forget NodeGyp is the main build system, so you need its requirements installed whatsoever.

#### Known Issues / Troubleshooting

1. Note that `node-gyp` doesn't support Python 2.7 anymore, so you'll need to install Python 3.6 or above.
2. **cmake** does not seem to allow debug mode for VS Code
3. **xmake** is not compiling properly in debug mode
4. I am pretty sure **node-gyp** is forcing its own c++ standard over the one set by `configure.js` 

### Installation

```bash
git clone https://github.com/templ-project/nodejs-addon-nan your_project
cd your_project
rm -rf .git
git init
git add remote origin https://url/to/your/project/repository
git add .
git commit -am "init"
git push origin master
npm install
# yarn install
# pnpm install
node .scripts/configure -x gyp -e vscode -ucl
```

Read [here](manual/configure_command.md) more about the rest of the integrated build systems & the supported IDEs.
### Development

#### Requirements

Please install:
- [NodeJs](https://nodejs.org/en/). We support version 12.x and above.
- a C++ IDE
  - [Visual Studio Code](https://code.visualstudio.com/) with [ITMCDev C++ Extension Pack](https://marketplace.visualstudio.com/items?itemName=itmcdev.node-cpp-extension-pack)
    - For Linux:
      - [gdb](https://www.gnu.org/software/gdb/) if you plan in using **gdb** as debug tool,
      - if not, [vadimcn.vscode-lldb](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) will help you without any flaws
  - [Jetbrains CLion](https://www.jetbrains.com/clion/)
  - Please help us supporting other IDEs as well
- a JavaScript/TypeScript IDE
  - [Visual Studio Code](https://code.visualstudio.com/) with [ITMCDev Node Extension Pack](https://marketplace.visualstudio.com/items?itemName=itmcdev.node-extension-pack)
  - [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/)
  - Please help us supporting other IDEs as well

##### VSCode Configuration

Please read about configuring [Visual Studio Code](manual/configure_vscode.md).

##### CLion Configuration

Please read about configuring [Jetbrains CLion](manual/configure_clion.md).

### Testing

Run unit tests using `npm run test`.

Testing is currently set to use unittest.

#### Single Tests

Run single unit tests file, by calling `npm run test:single -- test/path/to/file.test.js`

```bash
npm test:single -- test/index.test.js
```

### Deployment

Please check [release-it](https://www.npmjs.com/package/release-it) for making releases to [npmjs.com](https://www.npmjs.com/) or any other repository tool, then run:

```bash
npm run release
```

## Authors

* [Dragos Cirjan](mailto:dragos.cirjan@gmail.com) - Initial work

## Issues / Support

Add a set of links to the [issues](/templ-project/nodejs-addon-nanjs-addon-nan/issues) page/website, so people can know where to add issues/bugs or ask for support.

## License

(If the package is public, add licence)
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<!-- ## Changelog

Small changelog history. The rest should be added to [CHANGELOG.md](CHANGELOG.md).

See here a template for changelogs: https://keepachangelog.com/en/1.0.0/

Also see this tool for automatically generating them: https://www.npmjs.com/package/changelog -->
