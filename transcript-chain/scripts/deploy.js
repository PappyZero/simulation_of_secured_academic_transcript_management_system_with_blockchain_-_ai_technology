const { ethers } = require("hardhat");

async function main() {
  // 1. Get the factory for your contract
  const TranscriptFactory = await ethers.getContractFactory("Transcript");

  // 2. Kick off deployment (returns a Contract instance)
  const transcript = await TranscriptFactory.deploy();

  // 3. Wait until the deployment transaction is mined
  await transcript.waitForDeployment();

  // 4. Retrieve the on-chain address
  const address = await transcript.getAddress();

  console.log("Transcript contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
