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
      - [Build Systems](#build-systems)
        - [Node-Gyp](#node-gyp)
        - [CMake-Js](#cmake-js)
        - [XMake](#xmake)
      - [Supported IDEs](#supported-ides)
        - [Visual Studio Code + Extensions](#visual-studio-code--extensions)
        - [CLion](#clion)
      - [Linters, Formatters, Code Analysis](#linters-formatters-code-analysis)
      - [Git Hooks](#git-hooks)
    - [Prerequisites / Dependencies](#prerequisites--dependencies)
        - [TODO: For MacOS](#todo-for-macos)
        - [For Linux](#for-linux)
        - [For Windows](#for-windows)
          - [For cmake](#for-cmake)
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
    - [Known Issues](#known-issues)
  - [License](#license)

<!-- /TOC -->

## Getting Started

### Project Description

#### Build Systems

##### Node-Gyp

As we already know **[node-gyp](https://github.com/nodejs/node-gyp)** is the default and official builder for NodeJs addons and, also, **the one we recommend**, but since there are a multitude or C++ build systems out there, it is not the single one. See the next sections for other build systems.

To configure the project to use **node-gyp**, run the following command.

```bash
node .scripts/configure.js -x gyp
```

This will generate the `binding.gyp` file & adapt `package.json` to use **node-gyp** as default build system. 

> The current `.huksy/pre-commit` hook, will force this configuration no matter what, since, as we already declared, this is the default build system the project will use. To change this default setting, please take in consideration changing the hook file.

To read more about [node-gyp](https://github.com/nodejs/node-gyp) and [Gyp](https://gyp.gsrc.io/) *(the build system it is based on)*, we invite you to read more on their official pages.

##### CMake-Js

**[cmake-js](https://www.npmjs.com/package/cmake-js)** appeared from people's desire to use [CMake](https://cmake.org/) as the builder for NodeJs addons.

We added **cmake-js** to the project out of two reasons:
* to add support for a better development using of the [CLion](https://www.jetbrains.com/clion/) IDE.
* to add support for CMake and help people who use it with a standard template for NodeJs addons development

To configure the project to use **cmake-js**, run the following command.

```bash
node .scripts/configure.js -x cmake
```

This will generate the `CMakeLists.txt` file & adapt `package.json` to use **node-gyp** as default build system.

To fully understand how to use **cmake-js** as the default build system, please read the comments from [Node-Gyp](#node-gyp) regarding the `./kusky/pre-commit` hook, and, also, read the **cmake-js** documentation on how to reconfigure the `package.json` scripts for the code to build.

##### XMake

> **Help required**, if you're interested in making this smth greater.

**[xmake](https://xmake.io/)** appears in this list out of our curiosity on this specific build system. It does not have a default npm package, so use this configuration on your own risk.

To configure the project to use **xmake**, make sure you have [xmake installed](https://xmake.io/#/guide/installation), then run the following command.

```bash
node .scripts/configure.js -x xmake
```

This will generate the `xmake.lua` file & adapt `package.json` to use **node-gyp** as default build system.

#### Supported IDEs

##### Visual Studio Code + Extensions

Our config scripts have been addapted to work with either of the two C++ extensions for VS Code:
* [Microsoft C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
* [clangd](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd)


To configure the script for VS Code, please see the following commands.

```bash
# for Microsoft C/C++ Extension
node .scripts/configure.js -x <buildSystem> -i vscode
# for Clangd Extension
node .scripts/configure.js -x <buildSystem> -i vscode -ucl
```

##### CLion

CLion is currently compatible with [CMake](https://cmake.org/) only. You can still use other build systems for building the project, however you will require a `CMakeLists.txt` file, for CLion to be able to initialize the project properly.

To configure the script for CLion, please see the following commands.

```bash
# if you use CMake as a build system
node .scripts/configure.js -i clion
# if you wish to change the build system to something else
# this will still generate the CMakeLists.txt file
node .scripts/configure.js -x <buildSystem> -i clion
```

#### Linters, Formatters, Code Analysis
> **javascript** part implements:
> - [jscpd](https://github.com/kucherenko/jscpd), [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) for code analisys
> - [prettier](https://prettier.io/) for code formatting
> - [eslint](https://eslint.org/) for linting
>
> **c++** part implements:
> - [llmv clang](https://clang.llvm.org/) for linting and formatting
>
> By default, this implementation uses [npm](https://www.npmjs.com/), but you can easily change it to [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.js.org/) or any other package manager. 
#### Git Hooks


### Prerequisites / Dependencies

##### TODO: For MacOS

- Please install `git`, `c++`, `make`, `cmake` <!--or ~~`xmake`~~-->
- Please install Python 3.6 or above.

```bash
brew install git make
# for CMake
brew install  cmake
```

##### For Linux

- Please install `git`, `c++`, `make`, `cmake` <!--or ~~`xmake`~~-->
- Please install Python 3.6 or above.

```bash
# i.e ubuntu
sudo apt-get install build-essential git make -y
# for CMake
sudo apt-get install  cmake
```
##### For Windows

- Please install [git-scm](https://git-scm.com/download/win) tool.
- Please install a form of make
  - Install [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm)
  - Install [make](https://sourceforge.net/projects/ezwinports/files/) from [ezwinports](https://sourceforge.net/projects/ezwinports/files/)
  - Install [chocolatey](https://chocolatey.org/), run `choco install make`
- Please install [Python](https://www.python.org/downloads/windows/) & [Microsoft Build Tools 2017](https://visualstudio.microsoft.com/):
  - Run `npm i -g windows-build-tools`

###### For cmake
- Please install [cmake](https://cmake.org/)

#### Known Issues / Troubleshooting

1. Note that `node-gyp` doesn't support Python 2.7 anymore, so you'll need to install Python 3.6 or above.
2. If you plan on using [CLion](https://www.jetbrains.com/clion/) we recommend switching to `cmake-js`, since CLion has not support for `gyp`.

### Installation

```bash
git clone https://github.com/templ-project/nodejs-addon-nanjs-addon-nan your_project
cd your_project
rm -rf .git
git init
git add remote origin https://url/to/your/project/repository
git add .
git commit -am "init"
git push origin master
npm run change:language -- javascript # to use javascript
# or
# npm run change:language -- typescript # to use typescript
npm install
# yarn install
# pnpm install
```

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

### Known Issues

* **xmake** is not compiling properly in debug mode
* **cmake** does not seem to allow debug mode for VS Code

## License

(If the package is public, add licence)
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

<!-- ## Changelog

Small changelog history. The rest should be added to [CHANGELOG.md](CHANGELOG.md).

See here a template for changelogs: https://keepachangelog.com/en/1.0.0/

Also see this tool for automatically generating them: https://www.npmjs.com/package/changelog -->
