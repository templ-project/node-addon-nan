/**
 * C Standards List
 *
 * @link https://www.opensourceforu.com/2017/04/different-c-standards-story-c/
 *
 * Modify at your own risk.
 */

const cxxStandards = () => {
  const year = new Date().getFullYear();
  const standards = {};
  let std = 11;
  while (2000 + std < year) {
    standards[`cxx${std}`] = `cxx${std}`;
    if (2000 + std < 2020) {
      standards[`gnuxx${std}`] = `gnuxx${std}`;
    }
    std += 3;
  }
  return standards;
};

module.exports = {
  cxx03: 'cxx03',
  cxx98: 'cxx98',
  gnu98: 'gnuxx98',
  ...cxxStandards(),
};
