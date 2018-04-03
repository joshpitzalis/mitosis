// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

// const lotteryPath = path.resolve(__dirname, 'contracts', 'gruntFund.sol');
// const source = fs.readFileSync(lotteryPath, 'utf8');

// module.exports = solc.compile(source, 1).contracts[':GruntFund'];

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
// const fs = require('fs');

const buildPath = path.resolve(__dirname, 'src/build');

fs.removeSync(buildPath);
// @notice above removes the build folder if it exists
const gruntPath = path.resolve(__dirname, 'contracts', 'gruntFund.sol');
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// const proxyInboxPath = path.resolve(__dirname, 'contracts', 'ProxyInbox.sol');

const sourceGrunt = fs.readFileSync(gruntPath, 'utf8');
const sourceInbox = fs.readFileSync(inboxPath, 'utf8');
// const sourceProxyInbox = fs.readFileSync(proxyInboxPath, 'utf8');

const outputGrunt = solc.compile(sourceGrunt, 1).contracts;
const outputInbox = solc.compile(sourceInbox, 1).contracts;
// const outputProxyInbox = solc.compile(sourceProxyInbox, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in outputGrunt) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    outputGrunt[contract]
  );
}

for (let contract in outputInbox) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    outputInbox[contract]
  );
}

// for (let contract in outputProxyInbox) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract.replace(':', '') + '.json'),
//     outputProxyInbox[contract]
//   );
// }

// solcjs --bin --abi
