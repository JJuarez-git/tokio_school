const { Web3 } = require("web3");

const web3 = new Web3("http://localhost:8545");

web3.eth.getAccounts().then(console.log)
// web3.eth.getBlock().then(console.log)
web3.eth.getBlock(160).then(console.log)
web3.eth.getChainId().then(console.log)
web3.eth.getGasPrice().then(console.log)
console.log("default account", web3.eth.defaultAccount);