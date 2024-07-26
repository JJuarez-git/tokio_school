import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Web3 } from "web3";

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3("http://127.0.0.1:8545");

const AcademyJSON = require("../artifacts/contracts/Academy.sol/Academy.json");
const deployedAddresses = require("../ignition/deployments/chain-1337/deployed_addresses.json");
const AcademyContract = new web3.eth.Contract(AcademyJSON.abi, deployedAddresses['AcademyModule#Academy']);

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
        const { sender, course, student } = req.body;
        const response = await AcademyContract.methods.setStudentCourse(Number(course), student).send({
            from: sender,
            gas: '1000000'
        });
        res.status(200).json({ tx: response.transactionHash });

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
