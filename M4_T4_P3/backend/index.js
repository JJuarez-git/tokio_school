const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Web3 } = require("web3");

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3("http://127.0.0.1:7545");

const MessageCounter = require("./build/contracts/MessageCounter.json");
const SocialNetwork = require("./build/contracts/SocialNetwork.json");

const MessageCounterInstance = new web3.eth.Contract(
    MessageCounter.abi,
    MessageCounter.networks[5777].address
);

const SocialNetworkInstance = new web3.eth.Contract(
    SocialNetwork.abi,
    SocialNetwork.networks[5777].address
);

app.get('/accounts', async (req, res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        res.status(200).json(accounts);

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
});

app.get('/messages', async (req, res) => {
    try {
        const messages = await SocialNetworkInstance.methods.getAllMessages().call()
        res.status(200).json(messages);

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
});

app.post('/message', async (req, res) => {
    try {
        const { sender, name, content } = req.body;
        const result = await SocialNetworkInstance.methods.writeMessage(name, content).send({
            from: sender,
            gas: '1000000'
        });
        res.status(200).json({ tx: result.transactionHash })

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
});

app.get('/counter', async (req, res) => {
    try {
        const count = await MessageCounterInstance.methods.getCount().call();
        res.status(200).json({ count: Number(count) });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
