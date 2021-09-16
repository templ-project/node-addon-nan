## Configuring Visual Studio Code for developing a NodeJs C++ Addon 

Visual Studio Code is gifted with two plugins for C/C++ support:
  - Microsoft C/C++ [ms-vscode.cpptools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) with good support for language support, debugging and intellisense, yet no formatting options and
  - LLVM Clangd [llvm-vs-code-extensions.vscode-clangd](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd) with pretty much everything that Microsoft does but better + adding formatting options.

The following set of instructions will generate configuration for both extensions.

1. Run `node .scripts/configure.js -i vscode -x <build-system> <-ucl>`. 
   1. This will generate configurations for both *Microsoft C/C++* and *LLVM Clangd*
   2. In order to use *LLVM Clangd* plugin, please add the `-ucl` argument.
2. In order to make *LLVM Clangd* fully work, you will also need to set the `clangd.path` argument in your configuration. If you have clangd tool already installed on your machine, you can set the path to that specific installation; if not, the extension will ask you to download its own clangd binary. We suggest second version, since you will benefit of the latest release of *clangd*.

Running the script above, will generate all the necessary files for Visual Studio Code to run properly.
