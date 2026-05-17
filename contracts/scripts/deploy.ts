import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const AIModelRegistry = await ethers.getContractFactory("AIModelRegistry");
  const AIModelRegistryContract = await AIModelRegistry.deploy();
  await AIModelRegistryContract.waitForDeployment();
  console.log(
    "AIModelRegistry deployed to:",
    await AIModelRegistryContract.getAddress(),
  );

  const PaymentManager = await ethers.getContractFactory("PaymentManager");
  const PaymentManagerContract = await PaymentManager.deploy();
  await PaymentManagerContract.waitForDeployment();
  console.log(
    "PaymentManager deployed to:",
    await PaymentManagerContract.getAddress(),
  );

  const ReputationSystem = await ethers.getContractFactory("ReputationSystem");
  const ReputationSystemContract = await ReputationSystem.deploy();
  await ReputationSystemContract.waitForDeployment();
  console.log(
    "ReputationSystem deployed to:",
    await ReputationSystemContract.getAddress(),
  );

  const MarketplaceToken = await ethers.getContractFactory("MarketplaceToken");
  const MarketplaceTokenContract = await MarketplaceToken.deploy();
  await MarketplaceTokenContract.waitForDeployment();
  console.log(
    "MarketplaceToken deployed to:",
    await MarketplaceTokenContract.getAddress(),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

