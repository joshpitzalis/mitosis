import web3 from './web3';
import gruntFund from './build/GruntFund.json';
import factory from './build/Projectfactory.json';

export const projectInstance = address =>
  new web3.eth.Contract(JSON.parse(gruntFund.interface), address);

export const factoryInstance = new web3.eth.Contract(
  JSON.parse(factory.interface),
  '0x170E736ffba30cf9190ea16117631FDc8Db28a4c'
);
