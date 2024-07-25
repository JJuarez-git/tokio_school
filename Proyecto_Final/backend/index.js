const { Web3 } = require("web3");

(async () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    
    try {
        // const block = await web3.eth.getBlock();
        // console.log("Block", block);

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

    } catch (error) {
        console.error(error)   
    }
})();

