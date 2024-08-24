import { Command, Flags } from '@oclif/core';
import { BlockCypherService } from '../services/blockcypher-service';
import * as fs from 'fs';
import * as path from 'path';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
// import * as ecc from "tiny-secp256k1";
const ecc = require('tiny-secp256k1')
import { BIP32Factory } from "bip32";



export default class ListTransactions extends Command {

    static description = 'List Bitcoin transactions of a wallet';

    static flags = {
      wallet: Flags.string({char: 'w', description: 'Name of the wallet', required: true}),
      limit: Flags.integer({char: 'l', description: 'Number of transactions to display', default: 10}),
    };

    async run(): Promise<void> {

        const {flags} = await this.parse(ListTransactions);
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

    private async listTransactions(mnemonic: string, limit: number): Promise<void> {

        const service = new BlockCypherService();
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
            const amount = tx.outputs.reduce((sum: number, output: any) => 
              output.addresses.includes(address) ? sum + output.value : sum, 0) / 1e8;
            const type = amount > 0 ? 'Received' : 'Sent';
            this.log(`${index + 1}. ${type} ${Math.abs(amount)} BTC on ${date}`);
            this.log(`   Transaction Hash: ${tx.hash}`);
            this.log('   ------------------');
          });
        } catch (error) {
          this.error(`Failed to fetch transactions: ${error.message}`);
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