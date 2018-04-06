// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

// const lotteryPath = path.resolve(__dirname, 'contracts', 'gruntFund.sol');
// const source = fs.readFileSync(lotteryPath, 'utf8');

// module.exports = solc.compile(source, 1).contracts[':GruntFund'];

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
// const fs = require('fs');

const buildPath = path.resolve(__dirname, "src/build");

fs.removeSync(buildPath);
// @notice above removes the build folder if it exists
const gruntPath = path.resolve(__dirname, "contracts", "gruntFund.sol");
const source = fs.readFileSync(gruntPath, "utf8");
const output = solc.compile(source, 1).contracts;

console.log("output", output);

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}

// solcjs --bin --abi
