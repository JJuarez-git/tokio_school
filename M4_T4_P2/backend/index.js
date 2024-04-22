const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Web3 } = require("web3");

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3("http://127.0.0.1:7545");

const SocialNetwork = require("./build/contracts/SocialNetwork.json");
const contractAddress = "0xC80B9B2CD9fbCC3f60D1F6E07477E7B2178F027f";

const instance = new web3.eth.Contract(
    SocialNetwork.abi,
    contractAddress
);

app.get('/accounts', async (req, res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        res.status(200).json(accounts);

    } catch (error) {
        res.status(500).send(err.message)
    }
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await instance.methods.getAllMessages().call()
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).send(err.message)
    }
});

app.post('/message', async (req, res) => {
    try {
        const { sender, name, content } = req.body;
        const result = await instance.methods.writeMessage(name, content).send({
            from: sender,
            gas: '1000000'
        });
        res.status(200).json({ tx: result.transactionHash })

    } catch (error) {
        res.status(500).send(error.message)
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
