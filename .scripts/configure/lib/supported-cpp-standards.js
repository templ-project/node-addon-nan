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
    std += 3;
  }
  return standards;
};

module.exports = {
  cxx03: 'cxx03',
  ...cxxStandards(),
};
