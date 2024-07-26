const dotenv = require('dotenv');
dotenv.config();

export const CONFIG = {
    CHAIN_ID: process.env.CHAIN_ID || 1337,
}
