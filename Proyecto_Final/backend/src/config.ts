const dotenv = require('dotenv');
dotenv.config();

export const CONFIG = {
    CHAIN_ID: process.env.CHAIN_ID || 1337,
    RPC_NODE: process.env.RPC_NODE,
}
