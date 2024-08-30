import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Transaction, Web3 } from "web3";
import { CONFIG } from "./config";

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3(CONFIG.RPC_NODE);

const AcademyJSON = require("../artifacts/contracts/Academy.sol/Academy.json");
const deployedAddresses = require(`../ignition/deployments/chain-${CONFIG.CHAIN_ID}/deployed_addresses.json`);
const AcademyContract = new web3.eth.Contract(AcademyJSON.abi, deployedAddresses['AcademyModule#Academy']);
const signer = web3.eth.accounts.privateKeyToAccount(CONFIG.SIGNER_PRIVATE_KEY);

app.get('/courses', async (req, res) => {
    try {
        const response: string[] = await AcademyContract.methods.getCourses().call();
        res.status(200).json(response);

    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.get('/students', async (req, res) => {
    try {
        const response: string[] = await AcademyContract.methods.getStudents().call();
        res.status(200).json(response);

    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.post('/course/student', async (req, res) => {
    try {
        const { course, student } = req.body;
        const txData = AcademyContract.methods.setStudentCourse(Number(course), student).encodeABI();
        const tx: Transaction = {
            from: signer.address,
            to: deployedAddresses['AcademyModule#Academy'],
            gas: 1000000,
            gasPrice: 0,
            data: txData
        }

        const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
        const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.status(200).json({ tx: txHash.transactionHash });

    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.get('/course/:course/students', async (req, res) => {
    try {
        const { course } = req.params;
        const response: string[] = await AcademyContract.methods.getCourseStudents(Number(course)).call();
        res.status(200).json(response);

    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
