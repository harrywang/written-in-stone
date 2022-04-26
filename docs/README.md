# About

Code for http://writteninstone.xyz/

Check the [Code Repo](https://github.com/harrywang/written-in-stone)

The followings are used in this project:

- Solidity
- Hardhat
- Alchemy
- Mumbai/Polygon
- OpenZeppelin
- Ethers.js
- Next.js
- TailwindCSS


## Local Setup

Run this locally on a local testnet work

```
git clone https://github.com/harrywang/written-in-stone.git
cd written-in-stone
npm install ethers hardhat @nomiclabs/hardhat-waffle \
ethereum-waffle chai @nomiclabs/hardhat-ethers \
web3modal @walletconnect/web3-provider @openzeppelin/contracts \
tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography \
@headlessui/react@latest @heroicons/react react-icons dotenv
```

Start a local test node (record the first account and the private key):

```
npx hardhat node
```

(Optional for testing locally) Go to https://www.alchemy.com/ to get RPC links for testnets if needed. 

### Environment Variables

Create `.env` file in the root folder with the following environment variables - MAKE SURE to gitignore this file. 

Note: you have to use `NEXT_PUBLIC_` prefix if you want to expose the environment variables to the browser: see [docs](https://nextjs.org/docs/basic-features/environment-variables).

For local deployment, use the first account's private key above.

```
# private key for deploying the contract
PRIVATE_KEY='xxxccb2a3451da0c76475819ff278c1xxx'
# local | mumbai | polygon | ethereum
NEXT_PUBLIC_ENVIRONMENT='local'
NEXT_PUBLIC_ALCHEMY_URL_RINKEBY='https://eth-rinkeby.alchemyapi.io/v2/Iwj1GhXxxxxxx'
NEXT_PUBLIC_ALCHEMY_URL_ETHEREUM='https://eth-mainnet.alchemyapi.io/v2/2Y8exxxxxxxx'
NEXT_PUBLIC_ALCHEMY_URL_MUMBAI='https://polygon-mumbai.g.alchemy.com/v2/p0CT1Ttyxxx'
NEXT_PUBLIC_ALCHEMY_URL_POLYGON='https://polygon-mainnet.g.alchemy.com/v2/q-Z9s2PZx'
NEXT_PUBLIC_GOOGLE_ANALYTICS='G-2DTxxxG'
```

Deploy the contract on the local test node:

```
npx hardhat run scripts/deploy.js --network localhost

```

Start the server:

```
npm run dev
```

Setup the test account in MetaMask and switch to local network.

Visit http://localhost:3000 to try.


## Solidity Tests

You can run the tests as follows:

```
npx hardhat compile
npx hardhat test
```

## Contract Deployment

Note: when you test locally, you need to run `npm run dev` again after you change the Environment Variables.

### Mumbai

Deploy on Mumbai testnet:

- get some test MATIC from https://faucet.polygon.technology/
- Change the `.env` to `NEXT_PUBLIC_ENVIRONMENT='mumbai'` and run the following:
- Change the private key of the Mumbai test account: `PRIVATE_KEY='0xaxxx'`

```
npx hardhat run scripts/deploy.js --network mumbai

WrittenInStone deployed to: 0x5f804D0c7e195DF14E894fE871DD1991E30d0854
```
View deployed contact at https://mumbai.polygonscan.com/address/0x5f804D0c7e195DF14E894fE871DD1991E30d0854

### Polygon

Deploy on Polygon main network is essentially the same as on Mumbai - just need to change `NEXT_PUBLIC_ENVIRONMENT='polygon'` and use some real MATIC:

```
npx hardhat run scripts/deploy.js --network ploygon

WrittenInStone deployed to: 0xa8578e0e64bBF0c27BF8a0DD3211889D34c31FAf
```
View deployed contact at https://polygonscan.com/address/0xa8578e0e64bBF0c27BF8a0DD3211889D34c31FAf

MATIC is about $1.7 as of April 1, 2022.

It used ~0.0377 MATIC to deploy to polygon, which is about 6 cents.

It used ~0.0055 MATIC to write a message, which is about 1 cent.

### Ethereum

Deploy on Ethereum mainnet: change `NEXT_PUBLIC_ENVIRONMENT='ethereum'` and use some real ether:

```
npx hardhat run scripts/deploy.js --network ethereum

WrittenInStone deployed to: 0xA5a976B6950446e44B0dBc2515B4648E1DAa2014
```

View deployed contact at https://etherscan.io/address/0xA5a976B6950446e44B0dBc2515B4648E1DAa2014

It used ~0.0511 Ether to deploy to Ethereum, which is about $176.5 (Ether is about $3454 as of April 1, 2022)

## App Deployment

I have to remove `.eslintrc.json` to pass `npm run build`.

App is deployed using https://vercel.com/ with the following settings:

<img width="779" src="https://user-images.githubusercontent.com/595772/161360129-aa51bd43-73f4-49d1-bef8-a649397dcbf2.png">
<img width="778" src="https://user-images.githubusercontent.com/595772/161360131-244249c5-75f4-4c22-ac3d-ef0001322bdf.png">

## Contract Verification

[Related Hardhat Docs](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

Install the plugin first:

```
npm install --save-dev @nomiclabs/hardhat-etherscan

```

add the following to `hardhat.config.js`, get the API key from https://polygonscan.com and set the environment variable.

```
require("@nomiclabs/hardhat-etherscan");

...

  etherscan: {
    // Your API key for verifying contract
    // Obtain one at https://polygonscan.com
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
...

```

Then run the following with the DEPLOYED_CONTRACT_ADDRESS and "Constructor argument 1":

```
npx hardhat verify --network polygon 0xa8578e0e64bbf0c27bf8a0dd3211889d34c31faf "weiwei"

...
Nothing to compile
Successfully submitted source code for contract
contracts/WrittenInStone.sol:WrittenInStone at 0xa8578e0e64bbf0c27bf8a0dd3211889d34c31faf
for verification on the block explorer. Waiting for verification result...

Successfully verified contract WrittenInStone on Etherscan.
https://polygonscan.com/address/0xa8578e0e64bbf0c27bf8a0dd3211889d34c31faf#code

```

Visit https://polygonscan.com/address/0xa8578e0e64bbf0c27bf8a0dd3211889d34c31faf#code to see the check mark:

<img width="605" src="https://user-images.githubusercontent.com/595772/162581606-780a94e9-b70f-4411-a3ba-a67390429fe2.png">


## Gas Estimation

Install the plugin:

```
npm install hardhat-gas-reporter --save-dev
```
Get a free API key from https://coinmarketcap.com/api/pricing/:

<img width="2552" src="https://user-images.githubusercontent.com/595772/165367163-5dd98362-c35a-4ea2-8bbd-873038ec87ae.png">

Add the API key in `.env` file:

```
# API Key for estimate gas using CoinMarketCap
CMC_API_KEY='55578fxxxx'
```

Add the following to `hardhat.config.js`:

```
require("hardhat-gas-reporter");
...

module.exports = {
  ...
  gasReporter: {
    currency: 'USD',
    token: 'ETH',
    //token: 'MATIC',
    gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
    //gasPriceApi: 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
    coinmarketcap: process.env.CMC_API_KEY,
  },
  ...
}

```

run: `npx hardhat test` to see the result - this also run other hardhat tests. 

Note that the gas price (such as `69 gwei/gas` and `64 gwei/gas` below) is the price when you run the test and the following shows the different gas estimations (I paid $175 while the estimated gas fees are $140 and $130)


<img width="770" alt="Screen Shot 2022-04-26 at 2 34 36 PM" src="https://user-images.githubusercontent.com/595772/165368872-af422981-d999-4de0-831e-9093cca37257.png">
<img width="760" alt="Screen Shot 2022-04-26 at 2 34 43 PM" src="https://user-images.githubusercontent.com/595772/165368882-e7cab064-b9ae-4591-9124-c29075bd5324.png">

The default network is Ethereum. Other `token` and `gasPriceApi` options are as follows:
<img width="832" alt="Screen Shot 2022-04-26 at 2 44 03 PM" src="https://user-images.githubusercontent.com/595772/165370166-046df971-e3f3-46f9-b824-cdb793c31ca6.png">

The following is an example for Polygon:

<img width="765" src="https://user-images.githubusercontent.com/595772/165370912-92bbdb36-8a6a-44ca-b71a-ac69cbef4fa7.png">

## Documentations

[docsify](https://docsify.js.org) is used and documentations are stored in the `/docs` folder. To view the docs locally, run the following:

```
npm i docsify-cli -g
docsify serve docs
```