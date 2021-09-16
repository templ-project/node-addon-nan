/**
 * Wraps a callable into a try/catch, logging the error and exiting the script with an error code.
 *
 * Modify at your own risk.
 */
module.exports = async (callable, errCode = 1) => {
  try {
    await callable();
  } catch (e) {
    console.error(`Failed with:\n ${e.message}\n on:\n ${e.stack}`.red);
    process.exit(errCode);
  }
};
