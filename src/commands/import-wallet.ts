import { Command, Flags } from '@oclif/core';
import * as bip39 from 'bip39';
import * as fs from 'fs';
import * as path from 'path';

export default class ImportWallet extends Command {

    static override description = 'Importing a wallet from bip 39 mnemonic '

  static override flags = {
    
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name of wallet', required: true}),
    mnemonic : Flags.string({char: 'm', description: 'BIP39 Mnemonic (inside string ) ', required: true})

  }

  public async run(): Promise<void> {
    const { flags} = await this.parse(ImportWallet)
    const {name, mnemonic} = flags

    if(!bip39.validateMnemonic(mnemonic)){
        this.log('invalid mnemonic'); 
    }

    const wallet = {
        name,
        mnemonic,
        createdAt: new Date().toISOString(),
    };

    const walletDir = path.join(this.config.dataDir, 'wallets'); 
    if(!fs.existsSync(walletDir)){
      fs.mkdirSync(walletDir, {recursive: true}); 
    }

    const walletPath =path.join(walletDir, `${name}.json`)
    fs.writeFileSync(walletPath, JSON.stringify(wallet, null, 2));

    this.log(`Wallet "${name}" imported successfully.`);

  }

}