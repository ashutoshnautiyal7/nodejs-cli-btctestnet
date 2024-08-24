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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ListWallets extends core_1.Command {
    static description = 'List all wallets';
    async run() {
        const walletDir = path.join(this.config.dataDir, 'wallets');
        if (!fs.existsSync(walletDir)) {
            this.log('no wallets found');
            return;
        }
        const wallets = fs.readdirSync(walletDir)
            .filter(file => file.endsWith('.json'))
            .map(file => path.basename(file, '.json'));
        if (wallets.length === 0) {
            this.log('No wallets found.');
        }
        else {
            this.log('Available wallets:');
            wallets.forEach(wallet => this.log(wallet));
        }
    }
}
exports.default = ListWallets;
