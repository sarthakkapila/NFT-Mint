const { ethers } = require("ethers");

async function main() {
  const NFT = await ethers.deployContract("contracts/MuskNFT.sol:MuskNFT");
  const mint = await NFT.waitforDeployment();
  console.log("Deploying contract.....")
  console.log("Contract deployed at", await mint.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
