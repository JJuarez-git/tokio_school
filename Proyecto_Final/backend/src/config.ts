const dotenv = require('dotenv');
dotenv.config();

export const CONFIG = {
    CHAIN_ID: Number(process.env.CHAIN_ID) || 1337,
    RPC_NODE: process.env.RPC_NODE,
    MNEMONIC: process.env.MNEMONIC || "",
    SIGNER_PRIVATE_KEY: process.env.SIGNER_PRIVATE_KEY || ""
}
