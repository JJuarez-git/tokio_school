import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FirstJobModule = buildModule("FirstJobModule", (m) => {
    const counter = m.contract("Counter");
    return { counter };
});

export default FirstJobModule;


