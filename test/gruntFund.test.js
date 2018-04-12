const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
// const { interface, bytecode } = require('../compile');
const compiledGruntFund = require('../src/build/gruntFund.json');
const compiledFactory = require('../src/build/Projectfactory.json');

let accounts;
let gruntFund;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '2000000' });

  await factory.methods.createProject().send({
    from: accounts[0],
    gas: '2000000'
  });

  [projectAddress] = await factory.methods.getDeployedCampaigns().call();
  gruntFund = await new web3.eth.Contract(
    JSON.parse(compiledGruntFund.interface),
    projectAddress
  );
});

// beforeEach(async () => {
//   accounts = await web3.eth.getAccounts();
//   gruntFund = await new web3.eth.Contract(
//     JSON.parse(compiledGruntFund.interface)
//   )
//     .deploy({ data: compiledGruntFund.bytecode })
//     .send({ from: accounts[0], gas: '2000000' });

//   factory = await new web3.eth.Contract(
//     JSON.parse(compiledProjectFactory.interface)
//   )
//     .deploy({ data: compiledGruntFund.bytecode })
//     .send({ from: accounts[0], gas: '2000000' });
// });

describe('The Factory Contract', () => {
  it('deploys a factory ', () => {
    assert.ok(factory.options.address);
    assert.ok(gruntFund.options.address);
  });

  // it('can create two different projects', async () => {
  //   const project1 = await factory.methods
  //     .createProject()
  //     .send({
  //       gas: '1000000',
  //       from: accounts[0]
  //     })
  //     .catch(error => console.log('error', error));
  //   const project2 = await factory.methods
  //     .createProject()
  //     .send({
  //       gas: '1000000',
  //       from: accounts[0]
  //     })
  //     .catch(error => console.log('error', error));

  //   const allProjects = await factory.methods
  //     .getDeployedCampaigns()
  //     .call()
  //     .catch(error => console.log('error', error));

  //   assert.notEqual(allProjects[0], allProjects[1]);
  // });

  // tk write a test that the creator can approve teh first task
  // tk when you approve a task, only one task gets approved
});

describe('Grunt Fund', () => {
  it('deploys a gruntFund ', () => {
    assert.ok(gruntFund.options.address);
  });

  it('automatically starts the creator with 2 hours of equity', async () => {
    const grunts = await gruntFund.methods.getSummaryList().call();
    const creatorEquity = await gruntFund.methods.getSummary(grunts[0]).call();
    assert.equal(creatorEquity, 2);
  });

  it('adds a task to the task list', async () => {
    await gruntFund.methods.addDeliverable('test task').send({
      gas: '1000000',
      from: accounts[0]
    });
    const taskIndices = await gruntFund.methods
      .getPendingDeliverableList()
      .call();

    const task = await gruntFund.methods
      .getPendingDeliverable(taskIndices[0])
      .call();

    assert.equal(task['1'], 'test task');
    const time = await gruntFund.methods.totalTime(accounts[0]).call();
  });

  it('checks if initialization of time is complete', async () => {
    const time = await gruntFund.methods.totalTime(accounts[0]).call();
    assert.equal(time, 2);
  });
  //approve test : check if it approves based on weight
  it('approves a task from the list', async () => {
    await gruntFund.methods.addDeliverable('test task').send({
      gas: '1000000',
      from: accounts[0]
    });

    const taskIndices = await gruntFund.methods
      .getPendingDeliverableList()
      .call();

    await gruntFund.methods.approveDeliverable(taskIndices[0]).send({
      gas: '1000000',
      from: accounts[0]
    });

    const task = await gruntFund.methods
      .getPendingDeliverable(taskIndices[0])
      .call();

    assert.ok(task['4']);
  });

  //Reject test

  it('rejects a task from the list', async () => {
    await gruntFund.methods.addDeliverable('test task').send({
      gas: '1000000',
      from: accounts[0]
    });

    const taskIndices = await gruntFund.methods
      .getPendingDeliverableList()
      .call();

    await gruntFund.methods.rejectDeliverable(taskIndices[0]).send({
      gas: '1000000',
      from: accounts[0]
    });

    const task = await gruntFund.methods
      .getPendingDeliverable(taskIndices[0])
      .call();

    assert.ok(task['6']);
  });

  // it('approves a pending deliverable', async () => {
  //   const taskIndices = await gruntFund.methods
  //     .getPendingDeliverableList()
  //     .call();
  //   let approvals = await gruntFund.methods
  //     .pendingDeliverables(taskIndices[0])
  //     .call();
  //   assert.equal(approvals['3'], 0);
  //   await gruntFund.methods.approveDeliverable(taskIndices[0]).send({
  //     gas: '1000000',
  //     from: accounts[0]
  //   });
  //   approvals = await gruntFund.methods.pendingDeliverables(5).call();
  //   assert.equal(approvals['3'], 1);
  // });

  // it('gets all pending tasks', async () => {
  //   let pendingTasks = await gruntFund.methods
  //     .getAllPendingDeliverables()
  //     .call();
  //   assert.equal(pendingTasks, 0);
  // });

  // it('approves a pending deliverable', async () => {
  //   let approvals = await gruntFund.methods.pendingDeliverables(5).call();
  //   assert.equal(approvals['3'], 0);
  //   await gruntFund.methods.approveDeliverable(5).send({
  //     gas: '1000000',
  //     from: accounts[0]
  //   });
  //   approvals = await gruntFund.methods.pendingDeliverables(5).call();
  //   assert.equal(approvals['3'], 1);
  // });
});
