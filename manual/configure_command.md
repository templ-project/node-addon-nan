# Configure Command

- [Configure Command](#configure-command)
  - [Build Systems](#build-systems)
    - [Node-Gyp](#node-gyp)
    - [CMake-Js](#cmake-js)
    - [XMake](#xmake)
  - [Supported IDEs](#supported-ides)
    - [Visual Studio Code + Extensions](#visual-studio-code--extensions)
      - [CLangd](#clangd)
    - [CLion](#clion)
    - [C/C++ Standards](#cc-standards)

## Build Systems

### Node-Gyp

As we already know **[node-gyp](https://github.com/nodejs/node-gyp)** is the default and official builder for NodeJs addons and, also, **the one we recommend**, but since there are a multitude or C++ build systems out there, it is not the single one. See the next sections for other build systems.

To configure the project to use **node-gyp**, run the following command.

```bash
node .scripts/configure.js -x gyp
```

This will generate the `binding.gyp` file & adapt `package.json` to use **node-gyp** as default build system. 

> The current `.huksy/pre-commit` hook, will force this configuration no matter what, since, as we already declared, this is the default build system the project will use. To change this default setting, please take in consideration changing the hook file.

To read more about [node-gyp](https://github.com/nodejs/node-gyp) and [Gyp](https://gyp.gsrc.io/) *(the build system it is based on)*, we invite you to read more on their official pages.

### CMake-Js

**[cmake-js](https://www.npmjs.com/package/cmake-js)** appeared from people's desire to use [CMake](https://cmake.org/) as the builder for NodeJs addons.

We added **cmake-js** to the project out of two reasons:
* to add support for a better development using of the [CLion](https://www.jetbrains.com/clion/) IDE.
* to add support for CMake and help people who use it with a standard template for NodeJs addons development

To configure the project to use **cmake-js**, run the following command.

```bash
node .scripts/configure.js -x cmake
```

This will generate the `CMakeLists.txt` file & adapt `package.json` to use **node-gyp** as default build system.

To fully understand how to use **cmake-js** as the default build system, please read the comments from the [Node-Gyp](#node-gyp) section regarding the `./kusky/pre-commit` hook, and, also, read the [**cmake-js**](https://www.npmjs.com/package/cmake-js) documentation on how to reconfigure the `package.json` scripts for the code to build at install.

### XMake

> **Help required**, if you're interested in making this smth greater.

**[xmake](https://xmake.io/)** appears in this list out of our curiosity on this specific build system. It does not have a default npm package, so use this configuration on your own risk.

To configure the project to use **xmake**, make sure you have [xmake installed](https://xmake.io/#/guide/installation), then run the following command.

```bash
node .scripts/configure.js -x xmake
```

This will generate the `xmake.lua` file & adapt `package.json` to use **node-gyp** as default build system.

## Supported IDEs

### Visual Studio Code + Extensions

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

> Read more about configuring Visual Studio Code [here](manual/configure_vscode.md)

#### CLangd

As stated above, Visual Studio Code supports two different plugins for C/C++ coding. In order to work with the CLangd plugin, you will need to have LLVM Clangd installed locally in your computer. Furthermore, the same CLangd (`clang-formatter` && `clang-tidy`) is used to lint the C/C++ code written in the project.

### CLion

CLion is currently compatible with [CMake](https://cmake.org/) only. You can still use other build systems for building the project, however you will require a `CMakeLists.txt` file, for CLion to be able to initialize the project properly.

To configure the script for CLion, please see the following commands.

```bash
# if you use CMake as a build system
node .scripts/configure.js -i clion
# if you wish to change the build system to something else
# this will still generate the CMakeLists.txt file
node .scripts/configure.js -x <buildSystem> -i clion
```
> Read more about configuring CLion [here](manual/configure_clion.md)
configure_clion.md Linters, Formatters, Code Analysis

### C/C++ Standards

Recently, we added support for defining the C & C++ standards that you wish to support for your code. Please run `node .scripts/configure.js --help` to see all "supported" standards for both C & C++.

By default, C standard is set to c11 and C++ standard is set to `cxx11`.

To change the standards, please run

```bash
node .scripts/configure.js -cs c11 -cpps cxx11
```

Command supports multiple values per standard type, however these standards are used also based on the configuration capabilities of different tool.

For this reason only, please set the most important standard as the 1st one in your list.

```bash
node .scripts/configure.js -cs c17 -cs c11 -cpps gnuxx17 -cpps cxx17 -cpps gnuxx11 -cpps cxx11
```
