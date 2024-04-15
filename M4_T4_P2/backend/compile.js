// This code will compile smart contract and generate its ABI and bytecode
// Alternatively, you can use something like `npm i solc && npx solcjs MyContract.sol --bin --abi`

const solc = require('solc');
const path = require('path');
const fs = require('fs');

const fileName = 'M4_T4_P2.sol';
const contractName = 'SocialNetwork';

// Read the Solidity source code from the file system
const contractPath = path.join(__dirname, 'contracts', fileName);
const sourceCode = fs.readFileSync(contractPath, 'utf8');

// solc compiler config
const input = {
	language: 'Solidity',
	sources: {
		[fileName]: {
			content: sourceCode,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

// Compile the Solidity code using solc
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

// Get the bytecode from the compiled contract
const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;

// Get the ABI from the compiled contract
const abi = compiledCode.contracts[fileName][contractName].abi;

module.exports = { abi, bytecode };