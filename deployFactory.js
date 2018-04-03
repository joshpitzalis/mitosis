const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
  'junior naive security reveal wet stuff jaguar entire blush trigger museum vintage',
  'https://rinkeby.infura.io/qWWCAOLoD65CmWAo4jLg'
);

const web3 = new Web3(provider);
// const web3 = require('./web3');
const factory = require('./src/build/Projectfactory.json');

// const { bytecode } = require('./contracts/gruntFund_sol_GruntFund.bin');
// const { interface } = require('./contracts/gruntFund_sol_GruntFund.bin');

const deploy = async () => {
  try {
    const accounts = await web3.eth
      .getAccounts()
      .catch(err => console.log('err', err));

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(factory.interface))
      .deploy({ data: factory.bytecode })
      .send({ gas: '2000000', from: accounts[0] })
      .catch(err => console.log('err', err));

    console.log('Contract deployed to', result.options.address);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
deploy();
