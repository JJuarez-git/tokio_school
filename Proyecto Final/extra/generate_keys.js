const secp256k1 = require('secp256k1')
const keccak = require('keccak')
const { randomBytes } = require('crypto')
const fs = require('fs')
const path = require('path')
const Wallet = require('ethereumjs-wallet');
const yargs = require('yargs/yargs');

function generatePrivateKey() {
    let privKey
    do {
        privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey))
    return privKey
}

function derivePublicKey(privKey) {
    // slice on the end to remove the compression prefix ie. uncompressed use 04 prefix & compressed use 02 or 03
    // we generate the address, which wont work with the compression prefix
    let pubKey = secp256k1.publicKeyCreate(privKey, false).slice(1)
    return Buffer.from(pubKey)
}

function deriveAddress(pubKey) {
    if (!Buffer.isBuffer(pubKey)) {
        console.log("ERROR - pubKey is not a buffer")
    }
    let keyHash = keccak('keccak256').update(pubKey).digest()
    return keyHash.slice(Math.max(keyHash.length - 20, 1))
}

function generateNodeData(name) {
    let privateKey = generatePrivateKey()
    let publicKey = derivePublicKey(privateKey)
    let address = deriveAddress(publicKey)
    if (!fs.existsSync("keys")) {
        fs.mkdirSync("keys")
    }
    if (!fs.existsSync(path.join("keys", name))) {
        fs.mkdirSync(path.join("keys", name))
    }
    console.log("keys created, writing to file...")
    fs.writeFileSync(path.join("keys", name, "nodekey"), privateKey.toString('hex'));
    fs.writeFileSync(path.join("keys", name, "nodekey.pub"), publicKey.toString('hex'));
    fs.writeFileSync(path.join("keys", name, "address"), address.toString('hex'));
}

async function main(args) {

    const { name, password } = args;

    // generate nodekeys
    generateNodeData(name);

    // generate account
    const wallet = Wallet['default'].generate();
    const v3keystore = await wallet.toV3(password);
    console.log("account created, writing to file...")
    fs.writeFileSync(path.join("keys", name, "accountKeystore"), JSON.stringify(v3keystore));
    fs.writeFileSync(path.join("keys", name, "accountPrivateKey"), wallet.getPrivateKeyString());
    fs.writeFileSync(path.join("keys", name, "accountPassword"), password);
    return {
        privateKey: wallet.getPrivateKeyString(),
        keystore: JSON.stringify(v3keystore),
        password: password
    }
}

try {
    const args = yargs(process.argv.slice(2)).options({
        name: { type: 'string', demandOption: true, default: '', describe: 'Name for the node' },
        password: { type: 'string', demandOption: false, default: '', describe: 'Password for the account' }
    }).argv;

    if (!args.name) {
        throw new Error("You must specify a name for the node");
    }
    main(args)

} catch(e) {
    console.error(e)
}

