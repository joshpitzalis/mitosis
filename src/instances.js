import web3 from './web3';
import gruntFund from './build/GruntFund.json';
// import compiledInbox from './build/Inbox.json';
import factory from './build/Projectfactory.json';

export const gruntInstance = new web3.eth.Contract(
  JSON.parse(gruntFund.interface),
  '0xC5AD35D972D9Db0432aEdFc476BBb9F4A7674e41'
  // '0x23BA231Ab7976880d322b604a6C90F94fa541d81'
);

export const projectInstance = address =>
  new web3.eth.Contract(JSON.parse(gruntFund.interface), address);

export const factoryInstance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  '0x0D49998eE83a038F0b76d63D1651501C54737008'
  // '0xD1795D50967a3320050dfA2Bd5E533F95e1cDbbe'
);
