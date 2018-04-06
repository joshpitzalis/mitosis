var SimpleStorage = artifacts.require('./SimpleStorage.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};

var ProjectFactory = artifacts.require('./projectFactory.sol');

module.exports = function(deployer) {
  deployer.deploy(ProjectFactory);
};

var GruntFund = artifacts.require('./GruntFund.sol');

module.exports = function(deployer) {
  deployer.deploy(GruntFund);
};
