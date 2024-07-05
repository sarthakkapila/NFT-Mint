
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through 'node <script>'.
// When running the script with 'npx hardhat run <script>' you'll find the Hardhat
// Runtime Environment's members are available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  const Horoscope = await ethers.deployContract("contracts/horoscopeNFT.sol:horoscopeNFT");
  const horoscope = await Horoscope.waitForDeployment();
  console.log("Deploying Contract...")
  console.log("Contract deployed to address:", await horoscope.getAddress());
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

