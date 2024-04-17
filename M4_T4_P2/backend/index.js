const {Web3} = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

const SocialNetwork = require("./build/contracts/SocialNetwork.json");
const contractAddress = "0xe73DC397b857046B25366bA1CF4EbE271fafFAAB";

const instance = new web3.eth.Contract(
    SocialNetwork.abi,
    contractAddress
  );

const main = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        /* const result = await instance.methods.writeMessage('Jose', 'Esto es un mensaje').send({ 
            from: accounts[0],
            gas: '1000000'
        }); */
        const result = await instance.methods.getAllMessages().call({ from: accounts[0] });
        
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
}

main();