const {expect} = require('chai');

const {hello} = require('../src');

describe('hello', function () {
  it('hello() to return "Hello World!"', function () {
    expect(hello()).to.equal('Hello World!');
  });

  it('hello("World") to return "Hello World!"', function () {
    expect(hello('World')).to.equal('Hello World!');
  });

  it('hello("John") to return "Hello John!"', function () {
    expect(hello('John')).to.equal('Hello John!');
  });

  it('hello(1) to throw type exception', function () {
    const thrower = () => hello(1);
    expect(thrower).to.throw(TypeError, 'Invalid argument type; expecting string.');
  });
});
