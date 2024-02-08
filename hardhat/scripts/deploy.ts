import { ethers } from "hardhat";

const fromWei = (num) => ethers.formatEther(num);
const toWei = (num) => ethers.parseEther(num.toString());

async function main() {
  let poolMaster, udsc, token;
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const balanceBefore = fromWei(
    await deployer.provider.getBalance(deployer.address)
  );
  console.log(
    "Account balance:",
    fromWei(await deployer.provider.getBalance(deployer.address))
  );

  const PoolMaster = await ethers.getContractFactory("PoolMaster");
  // const Erc20Usdc = await ethers.getContractFactory("Erc20Usdc");
  const Token = await ethers.getContractFactory("TestToken");

  token = await Token.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Token contract address", tokenAddress);
  saveFrontendFiles(tokenAddress, "TestToken");

  poolMaster = await PoolMaster.deploy();
  await poolMaster.waitForDeployment();
  console.log("PoolMaster contract address", await poolMaster.getAddress());
  saveFrontendFiles(await poolMaster.getAddress(), "PoolMaster");

  // const usdcAddress = usdc.address
  // const usdcAddress = "0x5d7897579269F234015ba65743D9108F4AD5dB22" // sepolia
  // const usdcAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"; // arbitrum
  const usdcAddress = "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557"; // goerli
  // const tokenAddress = "0x4F69a31125a4bA6a51786181d5cC5a15E69df0c5"

  const setTokenCall = await poolMaster.setTokenAddress(tokenAddress);
  const setUsdcCall = await poolMaster.setUsdcAddress(usdcAddress);
  const setTokenCallTx = await setTokenCall.getTransaction();
  const setUsdcCallTx = await setUsdcCall.getTransaction();

  console.log(
    "Setters functions called: ",
    setTokenCallTx.hash,
    setUsdcCallTx.hash
  );

  console.log(
    "Eth spent for deployment script: ",
    balanceBefore -
      fromWei(await deployer.provider.getBalance(deployer.address))
  );
}

function saveFrontendFiles(address, name) {
  const fs = require("fs");
  const contractsDir = `${__dirname}../../contractsData`;

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    `${contractsDir}/${name}-address.json`,
    JSON.stringify({ address: address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    `${contractsDir}/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
