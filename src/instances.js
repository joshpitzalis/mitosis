import web3 from './web3';
import gruntFund from './build/GruntFund.json';
// import compiledInbox from './build/Inbox.json';
import factory from './build/Projectfactory.json';

// export const gruntInstance = new web3.eth.Contract(
//   JSON.parse(gruntFund.interface),
//   '0xC5AD35D972D9Db0432aEdFc476BBb9F4A7674e41'
//   // '0x23BA231Ab7976880d322b604a6C90F94fa541d81'
// );

export const projectInstance = address =>
  new web3.eth.Contract(JSON.parse(gruntFund.interface), address);

export const factoryInstance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  '0xC3846C849b560fDC5c8cc0bd0e5E3883d4145E03'
);
