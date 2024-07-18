const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
const web3 = new Web3Quorum(new Web3("http://localhost:8545"));

const wallet = web3.eth.accounts.wallet.create(1);
console.log(wallet);

// console.log(web3.eth.accounts.wallet);

// const account = web3.eth.accounts.create();

// web3.eth.accounts.wallet.add(account);

web3.eth.getAccounts().then(console.log);
// web3.eth.getBlock(1).then(console.log);