const Token = artifacts.require("cryptngTesttoken");

module.exports = function (deployer) {
  deployer.deploy(Token);
};