import {Command, Flags} from '@oclif/core'
import * as bip39 from 'bip39';
import * as fs from 'fs';
import * as path from 'path';

export default class CreateWallet extends Command {


  static override description = 'Create a new BIP39 wallet'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name of wallet', required: true}),
  }

  public async run(): Promise<void> {
    const { flags} = await this.parse(CreateWallet)
    const {name} = flags

    this.log(`creating wallet : ${name}`)

    const mnemonic = bip39.generateMnemonic(); 
    // Create a wallet object
    const wallet = {
      name: name,
      mnemonic: mnemonic,
      createdAt: new Date().toISOString(),
    };


    // saving the wallet to the json file : 

    const walletDir = path.join(this.config.dataDir, 'wallets'); 
    if(!fs.existsSync(walletDir)){
      fs.mkdirSync(walletDir, {recursive: true}); 
    }

    const walletPath =path.join(walletDir, `${name}.json`)

    this.log(`The wallet directory is : ${walletDir}`)
    this.log(`The wallet path is : ${walletPath}`)

    fs.writeFileSync(walletPath, JSON.stringify(wallet, null, 2)); 

    this.log(`the wallet ${name} created successfully` ); 

    this.log(`the generated mnemonic is : ${mnemonic}`)

  }
}
