import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Contract, Transaction, Web3 } from "web3";
import { CONFIG } from "./config";

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3(CONFIG.RPC_NODE);
let AcademyJSON: any, CounterJSON: any, deployedAddresses: any, AcademyContract: Contract<any>, CounterContract: Contract<any>, signer: any;

try {
    signer = web3.eth.accounts.privateKeyToAccount(CONFIG.SIGNER_PRIVATE_KEY);
    deployedAddresses = require(`../ignition/deployments/chain-${CONFIG.CHAIN_ID}/deployed_addresses.json`);
    CounterJSON = require("../artifacts/contracts/Counter.sol/Counter.json");
    AcademyJSON = require("../artifacts/contracts/Academy.sol/Academy.json");
    CounterContract = new web3.eth.Contract(CounterJSON.abi, deployedAddresses['FirstJobModule#Counter']);
    AcademyContract = new web3.eth.Contract(AcademyJSON.abi, deployedAddresses['SecondJobModule#Academy']);

} catch (error: any) {
    console.error('ERROR:', error.message)
}

/* 1st JOB */
app.post('/increment', async (req, res) => {
    try {
        const txData = CounterContract.methods.increment().encodeABI();
        const tx: Transaction = {
            from: signer.address,
            to: deployedAddresses['FirstJobModule#Counter'],
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

app.post('/decrement', async (req, res) => {
    try {
        const txData = CounterContract.methods.decrement().encodeABI();
        const tx: Transaction = {
            from: signer.address,
            to: deployedAddresses['FirstJobModule#Counter'],
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

app.get('/count', async (req, res) => {
    try {
        const response: number = await CounterContract.methods.getCount().call();
        res.status(200).json({ count: Number(response) });

    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
/* END 1st JOB */

/* 2nd JOB */
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
            to: deployedAddresses['SecondJobModule#Academy'],
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
/* END 2nd JOB */

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
