import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployModule = buildModule("DeployModule", (m) => {
    const academy = m.contract("Academy");

    const param = m.getParameter("initialOwner", "0xda23b6dd5057298ec7d14bc1543c2e6ca8ab0759")
    const tokio = m.contract("Tokio", [param]);
    return { academy, tokio };
});

export default DeployModule;


