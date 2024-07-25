const { Web3 } = require("web3");

const web3 = new Web3("http://localhost:8545");


web3.eth.getNodeInfo().then(console.log).catch(console.error);

/* const wallet = web3.eth.accounts.wallet.create(1);
console.log(wallet); */

// console.log(web3.eth.accounts.wallet);

// const account = web3.eth.accounts.create();

// web3.eth.accounts.wallet.add(account);

// web3.eth.getAccounts().then(console.log);
// web3.eth.getBlock().then(console.log);