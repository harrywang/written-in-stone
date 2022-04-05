# About

Code for http://writteninstone.xyz/

See the documentations at [http://harrywang.me/written-in-stone/](http://harrywang.me/written-in-stone/)

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

Create `.env` file in the root folder with the following environment variables - MAKE SURE to gitignore this file. 

For local deployment, use the first account's private key above.

```
# private key for deploying the contract
NEXT_PUBLIC_PRIVATE_KEY='xxxccb2a3451da0c76475819ff278c1xxx'
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
- Change the private key of the Mumbai test account: `NEXT_PUBLIC_PRIVATE_KEY='0xaxxx'`

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

## Documentations

[docsify](https://docsify.js.org) is used and documentations are stored in the `/docs` folder. To view the docs locally, run the following:

```
npm i docsify-cli -g
docsify serve docs
```