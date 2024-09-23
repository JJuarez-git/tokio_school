import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SecondJobModule = buildModule("SecondJobModule", (m) => {
    const academy = m.contract("Academy");
    return { academy };
});

export default SecondJobModule;


