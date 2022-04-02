/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")

// read environment variables from .env file during development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_URL_RINKEBY,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
    },
    ethereum: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_URL_ETHEREUM,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_URL_MUMBAI,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
    },
    polygon: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_URL_POLYGON,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
