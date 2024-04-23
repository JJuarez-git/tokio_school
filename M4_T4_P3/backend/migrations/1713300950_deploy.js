var MessageCounter = artifacts.require("MessageCounter");
var SocialNetwork = artifacts.require("SocialNetwork");

module.exports = async function(_deployer) {
  await _deployer.deploy(MessageCounter);
  const instance = await MessageCounter.deployed();
  await _deployer.deploy(SocialNetwork, instance.address);
  // Use deployer to state migration tasks.
};
