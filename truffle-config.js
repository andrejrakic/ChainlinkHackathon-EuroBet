// Allows us to use ES6 in our migrations and tests.
// require('babel-register')
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    kovan: {
      provider: () => new HDWalletProvider({
        privateKeys: [],
        providerOrUrl: ``
      }),
      network_id: 42,         // Kovan's id
      gas: 8000000,
      gasPrice: 25000000000,  // Check gas price on Kovan network, otherwise your transaction may hang
      confirmations: 2,       // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50,      // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true        // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: { 
      version: "0.6.2",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}