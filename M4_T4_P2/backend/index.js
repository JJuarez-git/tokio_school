const { Web3 } = require('web3');
const { abi, bytecode } = require('./compile');

// const web3 = new Web3('https://ethereum-rpc.publicnode.com');
const web3 = new Web3('https://sepolia.era.zksync.dev');
// const web3 = new Web3('http://127.0.0.1:7545');

(async () => {
    try {

        // const contract = new web3.eth.Contract(abi);

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const defaultAccount = accounts[0];
        console.log('deployer account:', defaultAccount);

        /* const deployer = contract.deploy({
            data: '0x' + bytecode,
            arguments: [],
        });

        const gas = await deployer.estimateGas({
            from: defaultAccount,
        });
        console.log('estimated gas:', gas); */


    } catch (error) {
        console.log(error.message);
    }
})();
