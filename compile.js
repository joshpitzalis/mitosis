const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'src/build');

fs.removeSync(buildPath);

const gruntPath = path.resolve(__dirname, 'contracts', 'gruntFund.sol');
const source = fs.readFileSync(gruntPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
