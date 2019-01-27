Replace the content in `truffle-config.js` with:


```
var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'YOUR WALLET KEY';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/YOUR_API_KEY")
      },
      network_id: 3,
      gas: 8000000     
    }
  }
};

```

In the `getWeb3.js`, replace the line `const web3 = new Web3(window.ethereum);` with `const web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/[YOUR_API_KEY]
));`
