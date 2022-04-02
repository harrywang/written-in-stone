const hre = require("hardhat");
const fs = require('fs');

async function main() {
  /* these two lines deploy the contract to the network */
  const WrittenInStone = await hre.ethers.getContractFactory("WrittenInStone");
  const wis = await WrittenInStone.deploy("weiwei");

  await wis.deployed();
  console.log("WrittenInStone deployed to:", wis.address);

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${wis.address}"
  export const ownerAddress = "${wis.signer.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });