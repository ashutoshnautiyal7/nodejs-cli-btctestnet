# Bitcoin Testnet Wallet CLI

A command-line interface (CLI) tool built with Node.js and Oclif for managing Bitcoin testnet wallets. This tool allows users to create, import, and manage Bitcoin wallets on the testnet, providing a simple and efficient way to interact with the Bitcoin testnet network.

## Commands

- `create-wallet`: Create a new BIP39 wallet

  input: ./bin/run.js create-wallet --name mywalletnew

  ouput: creating wallet : mywalletnew

  The wallet directory is : /home/ashutosh/.local/share/nodejs-oclif-cli/wallets

  The wallet path is : /home/ashutosh/.local/share/nodejs-oclif-cli/wallets/mywalletnew.json

  the wallet mywalletnew created successfully

  the generated mnemonic is : extra present crane typical stumble asthma expect submit actress open degree embody

- `import-wallet`: Import an existing wallet using a BIP39 mnemonic

  input : ./bin/run.js import-wallet --name newimoprted --mnemonic 'joy diet permit industry appear leisure prison deputy index prepare miracle column'

  output: Wallet "newimoprted" imported successfully.

- `list-wallets`: Display all locally stored wallets

  input : ./bin/run.js list-wallets

  output : Available wallets:
  finalwallet
  importedWallet
  mywallet
  mywallet2
  mywallet3
  newimoprted
  newimportedwallet
  newwallet

- `get-balance`: Fetch and display the balance for a selected wallet

  input : ./bin/run.js get-balance --wallet newwallet

  output : Derived address: mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV
  Balance of wallet "newwallet" (mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV): 0.00015001 BTC

- `list-transactions`: Show recent transactions for a wallet

  input : ./bin/run.js list-transactions --wallet newwallet --limit 5

  output :

            Derived address: mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV

            1. Received 0.00015001 BTC on 8/24/2024, 3:25:39 PM
            Transaction Hash: 0b37a8bfbca6b2cca646b55e3423e267969b93f199899fabaea06d9a39c701af
            ------------------
            2. Sent 0 BTC on 8/6/2024, 12:51:36 AM
            Transaction Hash: ca6ae3e067e894ed9a151a1e09a3a463e00452ffcc5f70c4be0f63651a9c8336
            ------------------
            3. Received 0.00009 BTC on 7/30/2024, 12:24:59 AM
            Transaction Hash: 0b492f27785715c93fc3899c908e92b1e1b5781370c88f2f86c3d8138a74fb78
            ------------------
            4. Sent 0 BTC on 7/15/2024, 11:17:08 AM
            Transaction Hash: 51f575304ac6ebde3deb9efa068d349423c5fb5279750fd2800b88b0b6f13e1d
            ------------------
            5. Received 0.00001856 BTC on 6/22/2024, 1:30:25 AM
            Transaction Hash: 2c04158b87416b945b0fd6504178cac1f43fbf1522ca33c2eec99a28af35e2ae
            ------------------
            6. Sent 0 BTC on 6/23/2023, 12:47:13 PM
            Transaction Hash: b7701f917cda3cbde56dc787a48e77226e1d1057092a431b503e1ebe65694a7f
            ------------------

- `generate-address`: Create a new unused Bitcoin testnet address for a wallet

      input : ./bin/run.js generate-address  --wallet newwallet

      output : Generated unused address: mqG5gik9qo6ESfGDF8PX4BsfXFACgVnMBM

                Derivation path: m/44'/0'/0'/0/1

## Features

- Create new BIP39 wallets
- Import existing wallets using BIP39 mnemonic phrases
- List all wallets stored locally
- Check wallet balances
- View transaction history for wallets
- Generate unused Bitcoin testnet addresses
- Perform operations using the Bitcoin testnet network

## Key Components

- Built with Node.js and TypeScript
- Uses Oclif framework for CLI structure
- Integrates with BlockCypher API for blockchain interactions
- Implements BIP39 and BIP44 standards for wallet management
- Securely stores wallet information locally

## Use Cases

- Educational purposes: Learn about Bitcoin wallet management and blockchain interactions
- Development and testing: Ideal for developers working on Bitcoin-related projects
- Blockchain exploration: Experiment with Bitcoin transactions on the testnet without using real funds

## Safety Notes

- This tool is designed for use with the Bitcoin testnet only
- Never use this tool with real Bitcoin or on the Bitcoin mainnet
- Always keep your mnemonic phrases and private keys secure

## Getting Started

- you would require to create blockcypher api token and store it in the .env file
- step 2 : npm i
- step 3 : write any commands as mentioned
