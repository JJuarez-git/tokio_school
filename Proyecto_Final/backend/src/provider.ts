import HDWalletProvider from "@truffle/hdwallet-provider";
import { CONFIG } from "./config";

const provider = new HDWalletProvider({
    mnemonic: CONFIG.MNEMONIC,
    providerOrUrl: CONFIG.RPC_NODE,
    numberOfAddresses: 1,
    derivationPath: "m/44'/60'/0'/0",
});

export default provider;