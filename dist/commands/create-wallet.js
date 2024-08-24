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
const bip39 = __importStar(require("bip39"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CreateWallet extends core_1.Command {
    static description = 'Create a new BIP39 wallet';
    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ];
    static flags = {
        // flag with a value (-n, --name=VALUE)
        name: core_1.Flags.string({ char: 'n', description: 'name of wallet', required: true }),
    };
    async run() {
        const { flags } = await this.parse(CreateWallet);
        const { name } = flags;
        this.log(`creating wallet : ${name}`);
        const mnemonic = bip39.generateMnemonic();
        // Create a wallet object
        const wallet = {
            name: name,
            mnemonic: mnemonic,
            createdAt: new Date().toISOString(),
        };
        // saving the wallet to the json file : 
        const walletDir = path.join(this.config.dataDir, 'wallets');
        if (!fs.existsSync(walletDir)) {
            fs.mkdirSync(walletDir, { recursive: true });
        }
        const walletPath = path.join(walletDir, `${name}.json`);
        this.log(`The wallet directory is : ${walletDir}`);
        this.log(`The wallet path is : ${walletPath}`);
        fs.writeFileSync(walletPath, JSON.stringify(wallet, null, 2));
        this.log(`the wallet ${name} created successfully`);
        this.log(`the generated mnemonic is : ${mnemonic}`);
    }
}
exports.default = CreateWallet;
