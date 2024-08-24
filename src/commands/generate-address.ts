import { Command, Flags } from '@oclif/core';
import { BlockCypherService } from '../services/blockcypher-service';
import * as fs from 'fs';
import * as path from 'path';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
// import * as ecc from "tiny-secp256k1";
const ecc = require('tiny-secp256k1')
import { BIP32Factory } from "bip32";



export default class GenerateAddress extends Command {

    static description = 'Generate an unused Bitcoin address for a wallet';

    static flags = {
      wallet: Flags.string({char: 'w', description: 'Name of the wallet', required: true}),
    };

    public async run(): Promise<any> {
        
        const {flags} = await this.parse(GenerateAddress); 
        const wallet = flags.wallet; 

        const walletDir = path.join(this.config.dataDir, 'wallets');
        const walletPath = path.join(walletDir, `${wallet}.json`);
    
        if (!fs.existsSync(walletPath)) {
          this.error(`Wallet "${wallet}" not found.`);
        }
    
        const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
        const { mnemonic } = walletData;

        this.generateUnusedAddress(mnemonic); 

        

    }

    private async generateUnusedAddress(mnemonic: string): Promise<void> {
        const seed = bip39.mnemonicToSeedSync(mnemonic);

        // Use the seed to generate a Bitcoin wallet on the testnet
        const testnet = bitcoin.networks.testnet;
    
        const bip32 = BIP32Factory(ecc);
        const root = bip32.fromSeed(seed , testnet);
        const account = root.derivePath("m/44'/0'/0'");

        const service = new BlockCypherService();
    
        for (let i = 0; i < 100; i++) { // Check up to 100 addresses
          const node = account.derive(0).derive(i);
          const { address } = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network: testnet });
    
          if (!address) {
            throw new Error('Failed to derive address');
          }
    
          try {
            const transactions = await service.getTransactions(address, 1);
            if (transactions.length === 0) {
              this.log(`Generated unused address: ${address}`);
              this.log(`Derivation path: m/44'/0'/0'/0/${i}`);
              return;
            }
          } catch (error) {
            this.error(`Failed to check address: ${error.message}`);
          }
        }
    
        this.error('Unable to find an unused address within the first 100 addresses.');
      }

}

