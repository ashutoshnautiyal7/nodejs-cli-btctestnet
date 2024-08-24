# Bitcoin Testnet Wallet CLI

A command-line interface (CLI) tool built with Node.js and Oclif for managing Bitcoin testnet wallets. This tool allows users to create, import, and manage Bitcoin wallets on the testnet, providing a simple and efficient way to interact with the Bitcoin testnet network.

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

## Commands

- `create-wallet`: Create a new BIP39 wallet
- `import-wallet`: Import an existing wallet using a BIP39 mnemonic
- `list-wallets`: Display all locally stored wallets
- `get-balance`: Fetch and display the balance for a selected wallet
- `list-transactions`: Show recent transactions for a wallet
- `generate-address`: Create a new unused Bitcoin testnet address for a wallet

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
