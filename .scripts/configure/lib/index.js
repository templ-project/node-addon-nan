const globby = require('globby');
const path = require('path');

module.exports = globby
  .sync(path.join(__dirname, '**/*.js'))
  .map((f) => f.replace(__dirname, '').substr(1))
  .filter((f) => f.indexOf('index') < 0)
  .map((f) => {
    const key = f
      .split('-')
      .map((chunk, i) => {
        if (i > 0) {
          return chunk.replace(/^./, (str) => str.toUpperCase());
        }
        return chunk;
      })
      .join('');
    return {
      [key.substr(0, key.length - 3)]: require(`./${f}`),
    };
  })
  .reduce(
    (a, b) => ({
      ...a,
      ...b,
    }),
    {},
  );

// console.log(module.exports);
