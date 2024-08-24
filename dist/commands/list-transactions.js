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
class ListTransactions extends core_1.Command {
    static description = 'List Bitcoin transactions of a wallet';
    static flags = {
        wallet: core_1.Flags.string({ char: 'w', description: 'Name of the wallet', required: true }),
        limit: core_1.Flags.integer({ char: 'l', description: 'Number of transactions to display', default: 10 }),
    };
    async run() {
        const { flags } = await this.parse(ListTransactions);
        const { wallet, limit } = flags;
        const walletDir = path.join(this.config.dataDir, 'wallets');
        const walletPath = path.join(walletDir, `${wallet}.json`);
        if (!fs.existsSync(walletPath)) {
            this.error(`Wallet "${wallet}" not found.`);
        }
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
        const { mnemonic } = walletData;
        await this.listTransactions(mnemonic, limit);
    }
    async listTransactions(mnemonic, limit) {
        const service = new blockcypher_service_1.BlockCypherService();
        const address = this.deriveAddress(mnemonic);
        try {
            const transactions = await service.getTransactions(address, limit);
            if (transactions.length === 0) {
                this.log('No transactions found for this wallet.');
                return;
            }
            //   this.log(`Recent transactions for wallet address ${address}: ${transactions}`);
            transactions.forEach((tx, index) => {
                const date = new Date(tx.received).toLocaleString();
                const amount = tx.outputs.reduce((sum, output) => output.addresses.includes(address) ? sum + output.value : sum, 0) / 1e8;
                const type = amount > 0 ? 'Received' : 'Sent';
                this.log(`${index + 1}. ${type} ${Math.abs(amount)} BTC on ${date}`);
                this.log(`   Transaction Hash: ${tx.hash}`);
                this.log('   ------------------');
            });
        }
        catch (error) {
            this.error(`Failed to fetch transactions: ${error.message}`);
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
exports.default = ListTransactions;
