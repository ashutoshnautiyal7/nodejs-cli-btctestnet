import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.BLOCKCYPHER_API_KEY;
const BASE_URL = 'https://api.blockcypher.com/v1/btc/test3';

export class BlockCypherService {

    async getBalance(address: string) :  Promise<number> {
        try {
            const response = await axios.get(`${BASE_URL}/addrs/${address}/balance?token=${API_KEY}`);
            return response.data.final_balance;
          } catch (error) {
            if (error.response) {
              throw new Error(`API error: ${error.response.data.error}`);
            } else if (error.request) {
              throw new Error('No response received from the API');
            } else {
              throw new Error(`Error setting up the request: ${error.message}`);
            }
        }

    }

    async getTransactions(address: string, limit: number = 10): Promise<any[]> {
      try {
        const response = await axios.get(`${BASE_URL}/addrs/${address}/full?limit=${limit}&token=${API_KEY}`);
        return response.data.txs || [];
      } catch (error) {
        if (error.response) {
          throw new Error(`API error: ${error.response.data.error}`);
        } else if (error.request) {
          throw new Error('No response received from the API');
        } else {
          throw new Error(`Error setting up the request: ${error.message}`);
        }
      }
    }
    
      async generateAddress(): Promise<string> {
        const response = await axios.post(`${BASE_URL}/addrs?token=${API_KEY}`);
        return response.data.address;
      }
      
}