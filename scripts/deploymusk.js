const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contract...");

  const MuskNFT = await ethers.getContractFactory("MuskNFT");

  // Define the constructor arguments
  const name = "MuskNFT";
  const symbol = "MSK";
  const elonMuskAddress = "0xF6490d8da3f6Fe027018A01F61eF71f8D69519E4"; // Replace with the actual address if different
  const muskPercent = 5;

  // Deploy the contract with the constructor arguments
  const nft = await MuskNFT.deploy(name, symbol, elonMuskAddress, muskPercent);

  await nft.waitForDeployment();

  console.log("Contract deployed at:", await nft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
