import { Web3 } from "web3";

(async () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    const AcademyJSON = require("../artifacts/contracts/Academy.sol/Academy.json");
    const deployedAddresses = require("../ignition/deployments/chain-1337/deployed_addresses.json");

    try {
        const AcademyContract = new web3.eth.Contract(
            AcademyJSON.abi,
            deployedAddresses['AcademyModule#Academy']
        );

        const courses: string[] = await AcademyContract.methods.getCourses().call();
        const map = new Map();

        courses.forEach((v, i) => map.set(i, v));
        console.log("CURSOS", map);

        /* const tx = await web3.eth.getTransaction("0x0b039cb47ca05cc36b106c456149f494e20a33ce60d69016b4b8cf502af688ce");
        console.log("TX", tx); */

        /* const accounts = await web3.eth.getAccounts();
        console.log("Accounts", accounts); */

    } catch (error) {
        console.error(error)   
    }
})();

