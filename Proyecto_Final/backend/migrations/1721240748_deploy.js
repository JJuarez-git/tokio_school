var Academy = artifacts.require("Academy");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Academy);
};
