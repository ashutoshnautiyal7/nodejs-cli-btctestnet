import { Command, Flags } from '@oclif/core';
import { BlockCypherService } from '../services/blockcypher-service';
import * as fs from 'fs';
import * as path from 'path';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
// import * as ecc from "tiny-secp256k1";
const ecc = require('tiny-secp256k1')
import { BIP32Factory } from "bip32";

export default class GetBalance extends Command {
  static description = 'Get Bitcoin balance of a wallet';

  static flags = {
    wallet: Flags.string({char: 'w', description: 'Name of the wallet', required: true}),
  };

  async run(): Promise<void> {
    const {flags} = await this.parse(GetBalance);
    const { wallet } = flags;

    const walletDir = path.join(this.config.dataDir, 'wallets');
    const walletPath = path.join(walletDir, `${wallet}.json`);

    if (!fs.existsSync(walletPath)) {
      this.error(`Wallet "${wallet}" not found.`);
    }

    const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
    const { mnemonic } = walletData;

    const address = this.deriveAddress(mnemonic);

    const service = new BlockCypherService();
    try {
      const balance = await service.getBalance(address);
      this.log(`Balance of wallet "${wallet}" (${address}): ${balance / 1e8} BTC`);
    } catch (error) {
      this.error(`Failed to fetch balance: ${error.message}`);
    }
  }

  private deriveAddress(mnemonic: string): string {
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Use the seed to generate a Bitcoin wallet on the testnet
    const testnet = bitcoin.networks.testnet;

    const bip32 = BIP32Factory(ecc);
    const root = bip32.fromSeed(seed , testnet);

    const path = "m/44'/1'/0'/0/0";  // BIP44 path for testnet
    
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