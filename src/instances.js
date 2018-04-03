import web3 from './web3';
import gruntFund from './build/GruntFund.json';
// import compiledInbox from './build/Inbox.json';
import factory from './build/Projectfactory.json';

export const gruntInstance = new web3.eth.Contract(
  JSON.parse(gruntFund.interface),
  '0x23BA231Ab7976880d322b604a6C90F94fa541d81'
);

export const projectInstance = address =>
  new web3.eth.Contract(JSON.parse(gruntFund.interface), address);

// export const inboxInstance = new web3.eth.Contract(
//   JSON.parse(compiledInbox.interface),
//   '0x89F34Ed5872c5FF3321dE7996e5F8F2a7e11A2dD'
// );

export const factoryInstance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  '0xD1795D50967a3320050dfA2Bd5E533F95e1cDbbe'
);
