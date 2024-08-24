"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const blockcypher_service_1 = require("../services/blockcypher-service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bip39 = __importStar(require("bip39"));
// import * as ecc from "tiny-secp256k1";
const ecc = require('tiny-secp256k1');
const bip32_1 = require("bip32");
class GetBalance extends core_1.Command {
    static description = 'Get Bitcoin balance of a wallet';
    static flags = {
        wallet: core_1.Flags.string({ char: 'w', description: 'Name of the wallet', required: true }),
    };
    async run() {
        const { flags } = await this.parse(GetBalance);
        const { wallet } = flags;
        const walletDir = path.join(this.config.dataDir, 'wallets');
        const walletPath = path.join(walletDir, `${wallet}.json`);
        if (!fs.existsSync(walletPath)) {
            this.error(`Wallet "${wallet}" not found.`);
        }
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
        const { mnemonic } = walletData;
        const address = this.deriveAddress(mnemonic);
        const service = new blockcypher_service_1.BlockCypherService();
        try {
            const balance = await service.getBalance(address);
            this.log(`Balance of wallet "${wallet}" (${address}): ${balance / 1e8} BTC`);
        }
        catch (error) {
            this.error(`Failed to fetch balance: ${error.message}`);
        }
    }
    deriveAddress(mnemonic) {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        // Use the seed to generate a Bitcoin wallet on the testnet
        const testnet = bitcoin.networks.testnet;
        const bip32 = (0, bip32_1.BIP32Factory)(ecc);
        const root = bip32.fromSeed(seed, testnet);
        const path = "m/44'/1'/0'/0/0"; // BIP44 path for testnet
        // Derive the first account's node (m/44'/0'/0')
        const child = root.derivePath(path);
        // Get the p2pkh address
        const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network: testnet });
        this.log(`Derived address: ${address}`);
        if (!address) {
            throw new Error('Failed to derive address');
        }
        return address;
    }
}
exports.default = GetBalance;
