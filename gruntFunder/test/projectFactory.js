var ProjectFactory = artifacts.require('./ProjectFactory.sol');

contract('ProjectFactory', function(accounts) {
  it('Should create a contract', function() {
    return ProjectFactory.deployed()
      .then(function(instance) {
        projectFactoryInstance = instance;

        return projectFactoryInstance.createProject({ from: accounts[0] });
      })
      .then(function() {
        return projectFactoryInstance.getDeployedCampaigns();
      })
      .then(function(storedData) {
        assert.equal(storedData.length, 1, 'The project was not created');
      });
  });
});
