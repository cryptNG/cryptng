const Token = artifacts.require("MinimalERC721");

module.exports = function (deployer) {
  deployer.deploy(Token);
};