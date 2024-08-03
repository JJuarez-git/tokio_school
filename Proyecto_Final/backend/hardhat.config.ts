import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { CONFIG } from './src/config';

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337
    },
    besu: {
      url: CONFIG.RPC_NODE,
      chainId: CONFIG.CHAIN_ID,
      accounts: {
        mnemonic: CONFIG.MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 1,
        passphrase: "",
      },
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
