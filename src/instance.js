import web3 from './web3';
import gruntFund from './build/GruntFund.json';

const instance = new web3.eth.Contract(
  JSON.parse(gruntFund.interface),
  '0x23BA231Ab7976880d322b604a6C90F94fa541d81'
);

export default instance;
