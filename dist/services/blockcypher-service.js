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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCypherService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const API_KEY = process.env.BLOCKCYPHER_API_KEY;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/test3';
class BlockCypherService {
    async getBalance(address) {
        try {
            const response = await axios_1.default.get(`${BASE_URL}/addrs/${address}/balance?token=${API_KEY}`);
            return response.data.final_balance;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`API error: ${error.response.data.error}`);
            }
            else if (error.request) {
                throw new Error('No response received from the API');
            }
            else {
                throw new Error(`Error setting up the request: ${error.message}`);
            }
        }
    }
    async getTransactions(address, limit = 10) {
        try {
            const response = await axios_1.default.get(`${BASE_URL}/addrs/${address}/full?limit=${limit}&token=${API_KEY}`);
            return response.data.txs || [];
        }
        catch (error) {
            if (error.response) {
                throw new Error(`API error: ${error.response.data.error}`);
            }
            else if (error.request) {
                throw new Error('No response received from the API');
            }
            else {
                throw new Error(`Error setting up the request: ${error.message}`);
            }
        }
    }
    async generateAddress() {
        const response = await axios_1.default.post(`${BASE_URL}/addrs?token=${API_KEY}`);
        return response.data.address;
    }
}
exports.BlockCypherService = BlockCypherService;
