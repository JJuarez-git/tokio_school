var SocialNetwork = artifacts.require("SocialNetwork");

module.exports = function(_deployer) {
  _deployer.deploy(SocialNetwork);
  // Use deployer to state migration tasks.
};
