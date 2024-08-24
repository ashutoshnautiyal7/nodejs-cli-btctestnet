import { Command } from '@oclif/core';
import * as fs from 'fs';
import * as path from 'path';

export default class ListWallets extends Command {
    static override description = 'List all wallets';

    public async run(): Promise<void> {
        
        const walletDir = path.join(this.config.dataDir, 'wallets'); 

        if(!fs.existsSync(walletDir)){
            this.log('no wallets found');
            return;
        }

        const wallets = fs.readdirSync(walletDir)
        .filter(file => file.endsWith('.json'))
        .map(file => path.basename(file, '.json'));


        if (wallets.length === 0) {
            this.log('No wallets found.');
        } else {
            this.log('Available wallets:');
            wallets.forEach(wallet => this.log(wallet));
        }
    }
    
}